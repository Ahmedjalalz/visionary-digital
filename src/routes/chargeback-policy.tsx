import { createFileRoute } from "@tanstack/react-router";
import { LegalDocumentViewer } from "@/components/site/LegalDocumentViewer";
import { CHARGEBACK_POLICY } from "@/data/legalPolicies";

export const Route = createFileRoute("/chargeback-policy")({
  head: () => ({
    meta: [
      { title: "Chargeback & Dispute Policy — Education and Life Foundation (ELF)" },
      {
        name: "description",
        content:
          "Official Chargeback Policy and Dispute Guidelines for Education and Life Foundation (ELF). Guidelines on payment recalls, banking reversals, dispute resolution, and cardholder protection.",
      },
      { property: "og:title", content: "Chargeback Policy — Education and Life Foundation" },
      {
        property: "og:description",
        content:
          "Direct resolution guidelines, banking coordination, and chargeback dispute policies under Pakistan banking regulations.",
      },
    ],
  }),
  component: ChargebackPolicyPage,
});

function ChargebackPolicyPage() {
  return <LegalDocumentViewer doc={CHARGEBACK_POLICY} highlightSectionId="sec-9" />;
}
