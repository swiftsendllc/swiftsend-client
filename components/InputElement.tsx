import React from 'react';

export default function InputElement({
  inputRef,
  setFiles,
  setObjectUrls
}: {
  inputRef: React.RefObject<HTMLInputElement>;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setObjectUrls: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          const input = e.target;
          console.log('......input');
          if (!input.files?.length) return;
          console.log('......input.....');
          const multipleFiles = Array.from(input!.files);
          console.log("multiple files", multipleFiles)
          setFiles((prev) => [...prev, ...multipleFiles]);
          setObjectUrls((prev) => [
            ...prev,
            ...multipleFiles.map((file) => URL.createObjectURL(file))
          ]);
        }}
        ref={inputRef}
        hidden
      />
    </>
  );
}
