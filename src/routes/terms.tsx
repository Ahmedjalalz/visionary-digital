import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  loader: () => {
    throw redirect({
      to: "/terms-and-conditions",
    });
  },
});
