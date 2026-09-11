import type { CommentRequest } from "../dto/CommentRequest";

import { HttpError } from "../exceptions/HttpError";

export const commentService = {
  createComment: async (
    postId: string,
    payload: CommentRequest,
  ): Promise<void> => {
    const url = `http://localhost:8080/api/posts/${postId}/comments`;
    const options: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status);
    }
  },
};
