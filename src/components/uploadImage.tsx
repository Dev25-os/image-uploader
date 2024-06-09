/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import React, { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import uploadLogo from "../assets/images/upload.svg";
import { SingleFile } from "./SingleFile";
import UploadError from "./UploadError";

type PropType = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

const UploadImage = ({ openDialog, setOpenDialog }: PropType) => {
  const [files, setFiles] = useState<any>([]);

  function onUpload(file: File, url: string) {
    setFiles((curr: any) =>
      curr.map((fw: any) => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      })
    );
  }

  function onDelete(file: File) {
    setFiles((curr: any) => curr.filter((fw: any) => fw.file !== file));
  }

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Do something with the files

      const mappedFiles: File[] | FileRejection[] = acceptedFiles.map(
        (file) => ({
          file,
          errors: [],
        })
      );

      setFiles((prev: any) => [...prev, ...mappedFiles, ...rejectedFiles]);
    },
    []
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "images/png": [".png"], "images/jpg": [".jpg"] },
    maxSize: 5 * 1024 * 1024,
    multiple: true,
    maxFiles: 5,
  });
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          className="px-3"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Upload image(s)</DialogTitle>
            <DialogDescription>You may upload up to 5 images</DialogDescription>
          </DialogHeader>

          <div
            {...getRootProps()}
            className={`${
              isDragActive ? "border-violet-700 " : "border-neutral-200 "
            }   border-[1.5px] rounded-sm p-10 bg-neutral-50`}
          >
            <input {...getInputProps()} />
            <div
              className="flex flex-col items-center
            justify-center text-center 
            "
            >
              <div className="top">
                <img src={uploadLogo} alt="upload logo" />
              </div>
              <h1 className="text-neutral-900 font-medium">
                Click or drag and drop to upload
              </h1>
              <p className="text-neutral-600 text-sm">PNG, or JPG (Max 5MB)</p>
            </div>
          </div>

          {/* render files */}
          <div className="overflow-y-auto max-h-72">
            {files.map((fileWrapper: any, idx: number) => (
              // <SingleFile
              //   key={idx}
              //   file={fileWrapper.file}
              //   onDelete={onDelete}
              //   onUpload={onUpload}
              // />
              <div key={idx}>
                {fileWrapper.errors.length ? (
                  <UploadError
                    file={fileWrapper.file}
                    errors={fileWrapper.errors}
                    onDelete={onDelete}
                  />
                ) : (
                  <SingleFile
                    onDelete={onDelete}
                    onUpload={onUpload}
                    file={fileWrapper.file}
                  />
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadImage;
