import { createFileRoute } from "@tanstack/react-router";
import { LegalDocumentViewer } from "@/components/site/LegalDocumentViewer";
import { PRIVACY_POLICY } from "@/data/legalPolicies";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Education and Life Foundation (ELF)" },
      {
        name: "description",
        content:
          "Privacy Policy for Education and Life Foundation (ELF). Explaining how personal information, donor confidentiality, child protection, and beneficiary records are safeguarded.",
      },
      { property: "og:title", content: "Privacy Policy — Education and Life Foundation" },
      {
        property: "og:description",
        content:
          "Learn how ELF protects donor privacy, sensitive beneficiary information, and adheres to data protection laws in Pakistan.",
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return <LegalDocumentViewer doc={PRIVACY_POLICY} />;
}
