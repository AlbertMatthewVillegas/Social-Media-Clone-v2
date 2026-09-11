import { createContext } from "react";
import type { PostEngagementContextValue } from "./types";

export const PostEngagementContext = createContext<
  PostEngagementContextValue | undefined
>(undefined);
