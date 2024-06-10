import { useCallback, useEffect, useState } from "react";

import close from "../assets/images/close.svg";
import cropIcon from "../assets/images/crop.svg";
import deleteIcon from "../assets/images/delete.svg";

import axios from "axios";
import ImageCrop from "./ImageCrop";

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
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [openCrop, setOpenCrop] = useState<boolean>(false);
  const [selectedImg, setSelectedImg] = useState<string | undefined>();

  const [uploadedSecureUrl, setUploadedSecureUrl] = useState<string>("");
  const [serverError, setServerError] = useState("");

  const upload = useCallback(async () => {
    const url = "https://api.cloudinary.com/v1_1/dwcs63bbx/image/upload";
    const key = "j42cqbrn";

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", key);

    try {
      const response = await axios.post(url, formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable) {
            const percentage = Math.round(
              (progressEvent?.loaded * 100) / progressEvent?.total
            );
            setProgress(percentage);
          }
        },
      });
      setLoading(false);
      setUploadedSecureUrl(response?.data?.secure_url);
      onUpload(file, response?.data?.secure_url);
      // return response.data.secure_url;
    } catch (error) {
      setLoading(false);
      setServerError(error.code);
    }
  }, [file]);

  const handleCrop = (file) => {
    setSelectedImg(file);
    setOpenCrop(true);
  };

  useEffect(() => {
    upload();
  }, [upload]);

  return (
    <div>
      <div className="flex  gap-2 ">
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
          {loading && (
            <div className="progress flex  gap-2">
              <div className="w-full  bg-gray-200 rounded-full h-1.5 flex-row  mt-2">
                <div
                  className=" w-full bg-blue-600 h-1.5 rounded-full "
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-neutral-600"> {progress}%</p>
            </div>
          )}

          {!loading && (
            <div className="flex gap-3 mt-2">
              <div
                className="top flex gap-1 cursor-pointer"
                onClick={() => handleCrop(URL.createObjectURL(file))}
              >
                <img
                  src={cropIcon}
                  alt=""
                  className="text-sm w-4 h-4 text-red cursor-pointer"
                />
                <p className="text-xs text-neutral-600">Crop</p>
              </div>

              <div className="bottom flex gap-1 cursor-pointer"
              onClick={() => onDelete(file)}
              >
                <img
                  src={deleteIcon}
                  alt=""
                  className="text-sm w-4 h-4 text-red cursor-pointer"
                  
                />
                <p className="text-xs text-neutral-600">Delete</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* crop window */}
      {openCrop && (
        <ImageCrop
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          openCrop={openCrop}
          setOpenCrop={setOpenCrop}
        />
      )}
    </div>
  );
};
