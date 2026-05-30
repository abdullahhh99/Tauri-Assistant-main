import { Button } from "@/Components/ui/button";
import React from "react";
import { useAppContext } from "@/Context/AppContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SettingsPage = () => {
  const { theme, setTheme } = useAppContext();

  const handleThemeChange = (value) => {
    setTheme(value);
    return;
  };

  return (
    <section>
      <h1 className="text-center text-3xl my-4 font-bold">Settings</h1>
      <article className="mx-auto max-w-3xl">
        <h2 className=" text-xl text-left mt-12 font-bold ">
          Game Sync Settings
        </h2>
        <div className="mt-4 flex justify-between items-center">
          <h3 className="text-left">Link Google Drive</h3>
          <div className="flex gap-2">
            <Button className={"bg-green-500"}>Connect</Button>
            <Button className={"bg-red-500"}>Disconnect</Button>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <h3>Select Drive Folder</h3>
          <Button className={"bg-green-500"}>Current Folder Name</Button>
        </div>
      </article>
      <article className="mx-auto max-w-3xl mt-10">
        <h2 className="text-xl font-bold">Appearance</h2>
        <div className="mt-4 flex justify-between items-center">
          <h3 className="">Themes</h3>
          <Select value={theme} onValueChange={handleThemeChange}>
            <SelectTrigger className="w-[180px] cursor-pointer transition-all">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={"bg-gray-800"}>
              <SelectItem
                value="midnight"
                className={"cursor-pointer text-white hover:bg-gray-700"}
              >
                Midnight
              </SelectItem>
              <SelectItem
                value="charcoal"
                className={"cursor-pointer text-white hover:bg-gray-700"}
              >
                Charcoal
              </SelectItem>
              <SelectItem
                value="noir"
                className={"cursor-pointer text-white hover:bg-gray-700"}
              >
                Noir
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </article>
      <article className="mt-10 mx-auto max-w-3xl">
        <h2 className="text-xl font-bold">Personal Catalog</h2>
        <div className="mt-4 flex items-center justify-between">
          <h3>Upload Personal Catalog file to Google Drive</h3>
          <Button className={"bg-green-500"}>
            Upload
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                fill="#fafcff"
                d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
              />
            </svg>
          </Button>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <h3>Import Personal Catalog file from Google Drive</h3>
          <Button className={"bg-green-500"}>
            Import
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                fill="#fafcff"
                d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
              />
            </svg>
          </Button>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <h3>Clear Catalog</h3>
          <Button className={"bg-red-500"}>
            Clear{" "}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                fill="#fafcff"
                d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
              />
            </svg>
          </Button>
        </div>
      </article>
    </section>
  );
};

export default SettingsPage;
