import React, { useState } from "react";
import SyncButton from "./SyncButton";
import TooltipMenu from "./TooltipMenu";
import "./Component-Styles/Card.css";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Button } from "./ui/button";

const Card = ({
  metaData,
  isInPersonalCatalog = true,
  setOpenPopup,
  setPopupData,
  setRevalidate,
}) => {
  const { title, imgUrl, platforms, releaseDate, catalogType, id } = metaData;
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative max-w-xs lg:max-w-md cursor-default"
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className=" text-black bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-row parent">
        <div
          className="
        w-2/5
        flex-shrink-0
        rounded-l-lg
        overflow-hidden
        pr-4
        relative
        cursor-pointer
        hoverToShow"
          onMouseEnter={() => setIsHovered(true)}
        >
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover rounded-inherit"
          />
        </div>

        <div className="w-3/5 p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <h1 className="text-md text-white mb-0.5 text-left truncate">
                {title}
              </h1>
            </TooltipTrigger>
            <TooltipContent className={""}>{title}</TooltipContent>
          </Tooltip>
          {/* <h2 className="text-md text-white mb-0.5 text-left truncate">
            {title}
          </h2> */}
          <div className="">
            <h4 className="text-sm text-white text-left mb-[0.1rem]">
              Platforms
            </h4>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {platforms.map((platform, i) => {
                return (
                  <p
                    key={i}
                    className="text-white text-xs bg-blue-400 w-max py-1 px-2 rounded-2xl cursor-default"
                  >
                    {platform}
                  </p>
                );
              })}
            </div>
            <div>
              <p className="text-sm text-white text-left mt-2">
                Release Date: <span>{releaseDate}</span>
              </p>
            </div>
            <div className="w-full mt-1.5">
              {isInPersonalCatalog ? (
                <div className="flex items-center cursor-pointer">
                  <div className="w-max bg-green-500 pl-2 py-2 cursor-pointer hover:bg-transparent backdrop-blur-lg border-1 border-transparent hover:border-1 rounded-l-2xl hover:border-green-500 transition-all group flex gap-2">
                    <div className="flex gap-1 items-center justify-between">
                      <div className="w-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 512"
                        >
                          <path
                            fill="#fff"
                            d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128l-368 0zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39L296 392c0 13.3 10.7 24 24 24s24-10.7 24-24l0-134.1 39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                          />
                        </svg>
                      </div>
                      <p className="text-sm w-full py-0.5 text-white group-hover:text-green-500 pt-1">
                        Upload File
                      </p>
                    </div>
                  </div>
                  <div
                    className="w-[45px] border-l-2 border-l-white border-1  rounded-r-2xl hover:border-green-600 hover:bg-transparent py-2  border-transparent bg-green-600 transition-all"
                    onClick={() => {
                      setOpenPopup(true);
                      setPopupData(metaData);
                      return;
                    }}
                  >
                    <div className="px-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="#fff"
                          d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                "Add Button"
              )}
            </div>
          </div>
        </div>
      </div>
      {isHovered && (
        <div className="absolute -bottom-10 left-0 bg-gray-700 rounded-sm z-10 bounce-in-down tooltip before:absolute before:-top-1.5 before:left-[40%] before:border-l-6 before:border-r-6 before:border-b-6 before:border-transparent before:border-b-gray-700">
          <TooltipMenu
            gameObj={metaData}
            setRevalidate={setRevalidate}
            isInPersonalCatalog={isInPersonalCatalog}
          />
        </div>
      )}
    </div>
  );
};

export default Card;
