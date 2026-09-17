import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/school-bags")({
  loader: () => {
    throw redirect({ to: "/projects/$slug", params: { slug: "school-bags" } });
  },
});
