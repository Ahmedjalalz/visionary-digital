import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/refunds")({
  loader: () => {
    throw redirect({
      to: "/refund-policy",
    });
  },
});
