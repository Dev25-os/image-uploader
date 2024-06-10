import React, { useEffect, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  convertToPixelCrop,
} from "react-image-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import "react-image-crop/dist/ReactCrop.css";
import canvaPreview from "./canvaPreview";

type PropType = {
  selectedImg: string | undefined;
  setSelectedImg: () => void;
  openCrop: boolean;
  setOpenCrop: (value?: boolean) => void;
};

const ImageCrop = ({
  selectedImg,
  setSelectedImg,
  openCrop,
  setOpenCrop,
}: PropType) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState();

  const [dataUrl, setDataUrl] = useState();

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: 25,
      },
      1,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  useEffect(() => {
    console.log("data", dataUrl);
  }, [dataUrl]);
  return (
    <div>
      <Dialog open={openCrop} onOpenChange={setOpenCrop}>
        <DialogContent
          className="px-3"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Crop Your Picture</DialogTitle>
          </DialogHeader>
          <ReactCrop
            aspect={1}
            keepSelection
            circularCrop={true}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(e) => {
              setCompletedCrop(e);
            }}
          >
            <img
              src={selectedImg}
              alt="upload image "
              onLoad={onImageLoad}
              className="max-h-[30vh]   object-cover "
            />
          </ReactCrop>

          <div className="w-full flex  gap-3">
            <button
              className="w-full sm:py-2 sm:px-3 py-1 px-2 text-sm sm:text-base border rounded shadow-md font-medium"
              onClick={() => setOpenCrop()}
            >
              Cancel
            </button>
            <button
              className="w-full bg-violet-700 text-white sm:py-2 sm:px-3 py-1 px-2 text-sm sm:text-base border rounded shadow-md font-medium"
              // onClick={() => {
              //   canvaPreview(
              //     imgRef.current, 
              //     previewCanvasRef.current, 
              //     convertToPixelCrop(
              //       crop,
              //       imgRef?.current?.width,
              //       imgRef?.current?.height
              //     )
              //   );
              //   const dataUrl = previewCanvasRef?.current?.toDataURL();
              //   setDataUrl(dataUrl);
              // }}
            >
              Confirm
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageCrop;
