CREATE TABLE public.school_bags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'Packed',
  destination text NOT NULL,
  school text NOT NULL,
  class_name text NOT NULL,
  student_name text,
  funded_by text NOT NULL,
  packed_by text NOT NULL,
  photo_url text,
  dispatched_on date,
  delivered_on date,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.school_bags TO anon, authenticated;
GRANT ALL ON public.school_bags TO service_role;
ALTER TABLE public.school_bags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can look up a school bag" ON public.school_bags FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  purpose text,
  meeting_date date NOT NULL,
  meeting_time text NOT NULL,
  platform text NOT NULL,
  status text NOT NULL DEFAULT 'requested',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.appointments TO anon, authenticated;
GRANT ALL ON public.appointments TO service_role;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can request a meeting" ON public.appointments FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.appointment_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  weekday smallint NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  slots text[] NOT NULL DEFAULT ARRAY[]::text[],
  is_active boolean NOT NULL DEFAULT true
);
GRANT SELECT ON public.appointment_availability TO anon, authenticated;
GRANT ALL ON public.appointment_availability TO service_role;
ALTER TABLE public.appointment_availability ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Availability is public" ON public.appointment_availability FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.appointment_blocked_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blocked_on date NOT NULL UNIQUE,
  reason text
);
GRANT SELECT ON public.appointment_blocked_dates TO anon, authenticated;
GRANT ALL ON public.appointment_blocked_dates TO service_role;
ALTER TABLE public.appointment_blocked_dates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Blocked dates are public" ON public.appointment_blocked_dates FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.donation_pledges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  amount numeric(12,2) NOT NULL CHECK (amount > 0),
  currency text NOT NULL DEFAULT 'USD',
  is_monthly boolean NOT NULL DEFAULT false,
  project_slug text,
  message text,
  status text NOT NULL DEFAULT 'pledged',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.donation_pledges TO anon, authenticated;
GRANT ALL ON public.donation_pledges TO service_role;
ALTER TABLE public.donation_pledges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can pledge" ON public.donation_pledges FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send a message" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);

INSERT INTO public.appointment_availability (weekday, slots, is_active) VALUES
  (1, ARRAY['09:30','10:30','11:30','14:00','15:00','16:00'], true),
  (2, ARRAY['09:30','10:30','11:30','14:00','15:00','16:00'], true),
  (3, ARRAY['09:30','10:30','11:30','14:00','15:00','16:00'], true),
  (4, ARRAY['09:30','10:30','11:30','14:00','15:00','16:00'], true),
  (5, ARRAY['10:00','11:00','12:00'], true),
  (0, ARRAY[]::text[], false),
  (6, ARRAY[]::text[], false);

INSERT INTO public.school_bags (tracking_id, status, destination, school, class_name, student_name, funded_by, packed_by, dispatched_on, delivered_on) VALUES
  ('EFL-2026-0001', 'Delivered', 'Kot Lakhpat, Lahore', 'EFL Community School — Raza Block', 'Class 4', 'Ayesha Bibi', 'Sponsor: A. Rahman (Auckland)', 'EFL Volunteer Team, Lahore', '2026-02-11', '2026-02-14'),
  ('EFL-2026-0002', 'In Transit', 'Sheikhupura District', 'Govt. Primary School, Chak 42', 'Class 2', 'Hamza Ali', 'Sponsor: The Qureshi Family (Toronto)', 'EFL Volunteer Team, Lahore', '2026-03-02', NULL),
  ('EFL-2026-0003', 'Packed', 'Allama Iqbal Town, Lahore', 'EFL Community School — Raza Block', 'Class 6', 'Sonia Bashir', 'Sponsor: Anonymous (Berlin)', 'EFL Volunteer Team, Lahore', NULL, NULL);