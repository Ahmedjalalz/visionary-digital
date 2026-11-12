import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/women-health-hygiene-empowerment")({
  loader: () => {
    throw redirect({
      to: "/projects/$slug",
      params: { slug: "women-health-hygiene-empowerment" },
    });
  },
});
