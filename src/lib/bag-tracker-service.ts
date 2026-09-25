import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

export interface TrackedBag {
  tracking_id: string;
  trackingId: string;
  status: string;
  raw_status?: string;
  destination: string | null;
  school: string | null;
  class_name: string | null;
  student_name: string | null;
  funded_by: string | null;
  packed_by: string | null;
  dispatched_on?: string | null;
  delivered_on?: string | null;
  photo_url: string | null;
}

function parseSiabHtml(html: string, id: string): TrackedBag | null {
  // If Microsoft .NET threw an unhandled null object exception or error page
  if (
    !html ||
    html.includes("Object reference not set") ||
    html.includes("Server Error in '/' Application")
  ) {
    return null;
  }

  const match = (regex: RegExp): string | null => {
    const m = html.match(regex);
    return m && m[1] ? m[1].replace(/<[^>]*>/g, "").trim() : null;
  };

  // Check if Bag Number or heading exists
  const bagNumber = match(/<div class="tracklabel">Bag Number<\/div>\s*<h1>#?(\d+)<\/h1>/i) || id;
  const rawStatus =
    match(/var currentStatus = '(.*?)';/i) ||
    match(/<div class="tracklabel">Current Status<\/div>\s*<h2>(.*?)<\/h2>/i) ||
    "In Transit";

  // If the page doesn't contain tracking data (e.g. redirected or empty)
  if (!html.includes("tracklabel") && !html.includes("Current Status")) {
    return null;
  }

  // Extract photo
  let photoUrl: string | null = null;
  const ogImg = match(/<meta property="og:image" content="(.*?)"/i);
  if (ogImg && ogImg.startsWith("http") && !ogImg.includes("siab-logo")) {
    photoUrl = ogImg;
  } else {
    const panelImg = match(/class="panel-body"[^>]*>\s*<img[^>]+src="(https?:\/\/[^">]+)"/i);
    if (panelImg && !panelImg.includes("siab-logo")) {
      photoUrl = panelImg;
    }
  }

  const destination = match(/<div class="tracklabel">Destination<\/div>\s*<h2>(.*?)<\/h2>/i);
  const recipient = match(/<div class="tracklabel">Recipient\/gender<\/div>\s*<h2>(.*?)<\/h2>/i);
  const age = match(/<div class="tracklabel">Age<\/div>\s*<h3>(.*?)<\/h3>/i);
  const school = match(/<div class="tracklabel">School\/class<\/div>\s*<h3>(.*?)<\/h3>/i);
  const fundedBy =
    match(/id="FundedByName" value="(.*?)"/i) ||
    match(/<div class="tracklabel">Funded by<\/div>[\s\S]*?<h3[^>]*>(.*?)<\/h3>/i);
  const packedBy =
    match(/id="PackedByName" value="(.*?)"/i) ||
    match(/<div class="tracklabel">Packed by<\/div>[\s\S]*?<h3[^>]*>(.*?)<\/h3>/i);

  // Normalize status to ELF stages: "Packed" | "In Transit" | "Delivered"
  let status = "In Transit";
  const sLower = rawStatus.toLowerCase();
  if (sLower.includes("arrived") || sLower.includes("delivered")) {
    status = "Delivered";
  } else if (sLower.includes("transit")) {
    status = "In Transit";
  } else if (sLower.includes("shipping") || sLower.includes("packed")) {
    status = "Packed";
  } else if (sLower.includes("funding")) {
    status = "Packed";
  }

  return {
    tracking_id: bagNumber,
    trackingId: bagNumber,
    status,
    raw_status: rawStatus,
    destination: destination && destination !== "Unknown" ? destination : (destination || null),
    school: school && school !== "Unknown" ? school : null,
    class_name: age && age !== "Unknown" ? `Age ${age}` : null,
    student_name: recipient && recipient !== "Unknown" ? recipient : null,
    funded_by: fundedBy && fundedBy !== "Unknown" ? fundedBy : null,
    packed_by: packedBy && packedBy !== "Unknown" ? packedBy : null,
    dispatched_on: null,
    delivered_on: status === "Delivered" ? "Delivered to recipient" : null,
    photo_url: photoUrl,
  };
}

export const fetchLiveBagDetails = createServerFn({ method: "GET" })
  .validator((trackingId: string) => trackingId.trim())
  .handler(async ({ data: trackingId }): Promise<TrackedBag | null> => {
    if (!trackingId) return null;

    try {
      // 1. Fetch live from School in a Bag tracker
      const url = `https://siab-live.azurewebsites.net/Bag/track/?bid=${encodeURIComponent(trackingId)}&submit=TRACK&pum_form_popup_id=2746`;
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      });

      if (response.ok) {
        const html = await response.text();
        const liveData = parseSiabHtml(html, trackingId);
        if (liveData) {
          return liveData;
        }
      }
    } catch (err) {
      console.warn(`[SIAB Tracker] Live fetch failed for ID ${trackingId}:`, err);
    }

    // 2. Fallback to Supabase if ever recorded locally
    try {
      const altTrackingId = trackingId.startsWith("ELF-")
        ? trackingId.replace(/^ELF-/i, "EFL-")
        : trackingId.startsWith("EFL-")
        ? trackingId.replace(/^EFL-/i, "ELF-")
        : trackingId;

      const { data } = await supabase
        .from("school_bags")
        .select("*")
        .or(`tracking_id.ilike.${trackingId},tracking_id.ilike.${altTrackingId}`)
        .maybeSingle();

      if (data) {
        return {
          tracking_id: data.tracking_id,
          trackingId: data.tracking_id,
          status: data.status,
          destination: data.destination,
          school: data.school,
          class_name: data.class_name,
          student_name: data.student_name,
          funded_by: data.funded_by,
          packed_by: data.packed_by,
          dispatched_on: data.dispatched_on,
          delivered_on: data.delivered_on,
          photo_url: data.photo_url,
        };
      }
    } catch (dbErr) {
      console.warn(`[SIAB Tracker] Supabase fallback check failed:`, dbErr);
    }

    return null;
  });
