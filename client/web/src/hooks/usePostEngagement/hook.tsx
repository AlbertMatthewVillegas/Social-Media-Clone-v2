import { useContext } from "react";
import { PostEngagementContext } from "./context";

export default function usePostEngagement() {
  const context = useContext(PostEngagementContext);

  if (context === undefined) {
    throw new Error(
      "usePostEngagement must be used within a PostEngagementProvider",
    );
  }

  return context;
}
