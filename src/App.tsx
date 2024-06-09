import "./App.css";
import banner from "./assets/images/banner.svg";
import avatar from "./assets/images/avatar.png";
import { useState } from "react";
import UploadImage from "./components/UploadImage";

const App = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <div className="backgroundColor h-screen flex items-center justify-center px-3">
      <div className="card bg-white  md:p-0 shadow-md rounded-sm md:mx-auto w-full md:w-fit">
        <div className="top relative">
          <div className="banner-container w-full h-36  md:h-auto overflow-hidden rounded-t-md">
            <img
              src={banner}
              alt="banner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-[40%] sm:left-8 left-2">
            <img
              src={avatar}
              alt="avatar"
              className="w-[120px] h-[120px] md:w-[160px] md:h-[160px]  rounded-full object-cover border-2 border-white"
            />
          </div>
        </div>
        <div className="p-3 flex w-full justify-end">
          <button
            className="sm:py-2 sm:px-3 py-1 px-2 text-sm sm:text-base border rounded shadow-md font-medium"
            onClick={handleDialog}
          >
            Update picture
          </button>
        </div>

        <div className="bottom mt-6 sm:px-10 px-4 mb-10">
          <h1 className="text-2xl text-neutral-900 font-semibold">
            Jack Smith
          </h1>

          <div className="info flex sm:flex-row flex-col md:items-center mt-3 gap-x-3 font-medium">
            <p className="text-lg text-neutral-900">@kingjack</p>
            <p className="text-lg text-neutral-900 sm:text-base">
              <span className="text-neutral-400">•</span> Senior Product
              Designer
              <span className="text-neutral-600"> at</span>
              <span className="text-indigo-700 font-bold italic"> w </span>{" "}
              Webflow
            </p>
            <p className="text-lg text-neutral-600 sm:text-base">
              <span className="text-neutral-400">•</span> He/Him
            </p>
          </div>
        </div>
      </div>

      {openDialog && (
        <UploadImage openDialog={openDialog} setOpenDialog={setOpenDialog} />
      )}
    </div>
  );
};

export default App;
