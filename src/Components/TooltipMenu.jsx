import React, { useState } from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import gamesList from "../testingData.json";
import { changeCatalogType } from "@/lib/utils";

const TooltipMenu = ({ gameObj, setRevalidate, isInPersonalCatalog }) => {
  const changeCatalogTypeHandler = async (e) => {
    console.log("Tooltip menu \n" + gameObj);

    const newCatalogType = e.currentTarget.value;

    await changeCatalogType(gameObj, newCatalogType);

    if (isInPersonalCatalog) {
      setRevalidate(Math.ceil(Math.random() * 100));
    }

    return;
  };

  return (
    <aside className="px-2 py-1 mx-auto w-max">
      <div className="flex gap-4 w-max justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={"bg-transparent backdrop-blur-md"}
              value={"completed"}
              onClick={(e) => changeCatalogTypeHandler(e)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="hover:scale-[1.3] transition-all"
              >
                <path
                  fill="#63E6BE"
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Completed</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={"bg-transparent backdrop-blur-md"}
              onClick={(e) => changeCatalogTypeHandler(e)}
              value={"playing"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="#B197FC"
                  d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Playing</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={"bg-transparent backdrop-blur-md"}
              onClick={(e) => changeCatalogTypeHandler(e)}
              value={"planned"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="#FFD43B"
                  d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Plan to play</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={"bg-transparent backdrop-blur-md"}
              onClick={(e) => changeCatalogTypeHandler(e)}
              value={"dropped"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="#e23232"
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
                />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Dropped</TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
};

export default TooltipMenu;
