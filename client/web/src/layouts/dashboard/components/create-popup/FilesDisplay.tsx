interface FilesDisplayProps {
  files: File[];
}

function FilesDisplay({ files }: FilesDisplayProps) {
  if (files.length > 0) {
    return (
      <div className="flex flex-row gap-2 overflow-x-auto">
        {files.map((file) => (
          <span key={`${file.name}-${file.lastModified}-${file.size}`}>
            {file.type.startsWith("image/") ? (
                <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-50 w-40 object-cover"
                />
            ): (
                <video 
                    src={URL.createObjectURL(file)}
                    className="h-50 w-40 object-cover"
                />
            )}
          </span>
        ))}
      </div>
    );
  }

  return <p className="text-sm text-[#948D83]">No files selected</p>;
}

export default FilesDisplay;