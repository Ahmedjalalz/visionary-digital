import { createFileRoute } from "@tanstack/react-router";
import { LegalDocumentViewer } from "@/components/site/LegalDocumentViewer";
import { TERMS_AND_CONDITIONS } from "@/data/legalPolicies";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions — Education and Life Foundation (ELF)" },
      {
        name: "description",
        content:
          "General Terms and Conditions for Education and Life Foundation (ELF). Governing website use, donations, programmes, partnerships, and governance.",
      },
      {
        property: "og:title",
        content: "General Terms and Conditions — Education and Life Foundation",
      },
      {
        property: "og:description",
        content:
          "Principal rules governing ELF website, donations, charitable programmes, institutional partnerships, and organisational operations.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return <LegalDocumentViewer doc={TERMS_AND_CONDITIONS} />;
}
