import { useState, type ChangeEvent } from "react";
import { convertFileToBase64 } from "../../../../utils/convertobase64string";
import { postService } from "../../../../services/postService";
import useCurrentUser from "../useCurrentUser/hook";
import type { PostRequest } from "../../../../dto/PostRequest";

type UploadPostFormData = {
  files: File[];
  title: string;
  description: string;
};

const initialFormData: UploadPostFormData = {
  files: [],
  title: "",
  description: "",
};

export function useUploadPost() {
  const [formData, setFormData] = useState<UploadPostFormData>(initialFormData);
  const currentUser = useCurrentUser()
  const handleChange = (field: keyof UploadPostFormData, value: string) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  const handleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setFormData((previous) => ({ ...previous, files: Array.from(files)}));
    }
  };

  const handlePost = async () => {
    const postOwner = currentUser?.userId
    if (!postOwner) return;

    const fileData: string[] = await Promise.all(
      formData.files.map((file) => convertFileToBase64(file))
    );

    const request: PostRequest = {
      userId: postOwner,
      content: fileData,
      title: formData.title,
      description: formData.description
    };
    await postService.createPost(request)
  }

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return {
    formData,
    handlePost,
    handleChange,
    resetForm,
    handleFilesChange,
  };
}
