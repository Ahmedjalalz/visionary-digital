import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/school-bag-distribution")({
  loader: () => {
    throw redirect({ to: "/projects/$slug", params: { slug: "school-bags" } });
  },
});
