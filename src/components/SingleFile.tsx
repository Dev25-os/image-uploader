import { useEffect, useState } from "react";

import close from "../assets/images/close.svg";

export interface SingleFileUploadWithProgressProps {
  file: File;
  onDelete: (file: File) => void;
  onUpload: (file: File, url: string) => void;
}
export const SingleFile = ({
  file,
  onDelete,
  onUpload,
}: SingleFileUploadWithProgressProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log("ff", file);

    async function upload() {
      const url = await uploadFile(file, setProgress);
      onUpload(file, url);
    }
    upload();
  }, []);

  return (
    <div className="flex  gap-2">
      <div className="left w-20 h-20">
        <img
          src={URL.createObjectURL(file)}
          alt="image"
          className="object-cover rounded-md"
        />
      </div>
      <div className="right w-full ">
        <div className="top flex  justify-between">
          <h1 className="font-semibold text-neutral-900 text-sm">
            {file.name}
          </h1>
          <img
            src={close}
            alt=""
            className="text-sm w-4 h-4 text-red cursor-pointer"
            onClick={() => onDelete(file)}
          />
        </div>
        <p className="text-xs"> {(file.size / 1024).toFixed(2)} KB </p>
        <div className="progress flex  gap-2">
          <div className="w-full  bg-gray-200 rounded-full h-1.5 flex-row  mt-2">
            <div
              className={` w-[${progress}%] bg-blue-600 h-1.5 rounded-full `}
            ></div>
          </div>
          <p className="text-xs text-neutral-600"> {progress}%</p>
        </div>
      </div>
      {/* <p> {file.name} </p>
      <p> {progress} </p>
      <h1 onClick={() => onDelete(file)}>delete</h1> */}
    </div>
  );
};

function uploadFile(file: File, onProgress: (percentage: number) => void) {
  const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
  const key = "docs_upload_example_us_preset";

  return new Promise<string>((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      res(resp.secure_url);
    };
    xhr.onerror = (evt) => rej(evt);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", key);

    xhr.send(formData);
  });
}
