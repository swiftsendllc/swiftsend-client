import React from 'react';

interface InputElementProps {
  inputRef: React.RefObject<HTMLInputElement>;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setObjectUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

export const InputElement = ({ inputRef, setFiles, setObjectUrls }: InputElementProps) => {
  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          const input = e.target;
          if (!input.files?.length) return;
          const multipleFiles = Array.from(input!.files).slice(0, 10);
          setFiles((prev) => [...prev, ...multipleFiles]);
          setObjectUrls((prev) => [
            ...prev,
            ...multipleFiles.map((file) => {
              const urls = URL.createObjectURL(file);
              console.log(urls);
              return urls;
            })
          ]);
        }}
        ref={inputRef}
        hidden
      />
    </>
  );
};
