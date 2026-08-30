export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    // Reads file as a Data URL (e.g., "data:image/png;base64,iVBORw0KGgo...")
    reader.readAsDataURL(file);
    
    reader.onload = () => {
      resolve(reader.result as string);
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
