import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/faith-hope-love-for-every-child")({
  loader: () => {
    throw redirect({
      to: "/projects/$slug",
      params: { slug: "faith-hope-love-for-every-child" },
    });
  },
});
