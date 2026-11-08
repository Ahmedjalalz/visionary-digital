import { createFileRoute } from "@tanstack/react-router";
import { LegalDocumentViewer } from "@/components/site/LegalDocumentViewer";
import { REFUND_AND_CHARGEBACK_POLICY } from "@/data/legalPolicies";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Donation Refund Policy — Education and Life Foundation (ELF)" },
      {
        name: "description",
        content:
          "Official Donation Refund, Cancellation and Chargeback Policy for Education and Life Foundation (ELF). 14-day error notification, verification procedures, and donor safeguards.",
      },
      { property: "og:title", content: "Donation Refund Policy — Education and Life Foundation" },
      {
        property: "og:description",
        content:
          "Clear procedures for duplicate donations, clerical errors, payment disputes, and chargebacks under Pakistan regulatory standards.",
      },
    ],
  }),
  component: RefundPolicyPage,
});

function RefundPolicyPage() {
  return <LegalDocumentViewer doc={REFUND_AND_CHARGEBACK_POLICY} />;
}
