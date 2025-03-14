import React from 'react';

export const InputElement = ({
  inputRef,
  setFiles,
  setObjectUrls
}: {
  inputRef: React.RefObject<HTMLInputElement>;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setObjectUrls: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          const input = e.target;
          if (!input.files?.length) return;
          const multipleFiles = Array.from(input!.files);
          setFiles((prev) => [...prev, ...multipleFiles]);
          setObjectUrls((prev) => [...prev, ...multipleFiles.map((file) => URL.createObjectURL(file))]);
        }}
        ref={inputRef}
        hidden
      />
    </>
  );
};
