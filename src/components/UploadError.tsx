import React from "react";
import { FileError } from "react-dropzone";
import close from "../assets/images/close.svg";
import brokenImage from "../assets/images/brokenImage.svg";

export interface UploadErrorProps {
  file: File;
  onDelete: (file: File) => void;
  errors: FileError[];
}
const UploadError = ({ file, onDelete, errors }: UploadErrorProps) => {
  console.log("erorr", errors);

  return (
    <div className="flex  gap-2">
      <div className="left w-20 h-20">
        <img
          src={brokenImage}
          alt="brokenImage"
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
        <div>
          {errors.map((error) => (
            <div key={error.code}>
              {/* {error.code === "file-invalid-type" && (
                <p className="text-xs text-red-600 mt-1">
                  The file format of {file.name} is not supported. Please upload
                  an image in one of the following formats: JPG or PNG.{" "}
                </p>
              )}

              {error.code === "file-too-large" && (
                <p className="text-xs text-red-600 mt-1">
                  This image is larger than 5MB. Please select a smaller image.
                </p>
              )} */}

              <p className="text-xs text-red-600 mt-1">{error.message} </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadError;
