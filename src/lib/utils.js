import { appLocalDataDir, join } from "@tauri-apps/api/path";
import { exists, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const RAWG_KEY = import.meta.env.VITE_RAWG_API;

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const fetchGames = async (queryStr) => {
  // check cached data
  // if present and not expired return data; else continue below

  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${RAWG_KEY}&${queryStr}`
    );

    // set Cached Data

    return {
      response: response.data.results,
      links: {
        nextPage: response.data.next,
        prevPage: response.data.previous,
      },
      error: null,
    };
  } catch (error) {
    return { response: null, error, links: null };
  }
};

export function formatDate(dateObj) {
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getTodayAndOneMonthAgoDates() {
  const today = new Date();

  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  if (oneMonthAgo.getDate() !== today.getDate()) {
    oneMonthAgo.setDate(0);
  }

  const formatedDate = formatDate(today);
  const oneMonthFormattedDate = formatDate(oneMonthAgo);

  return { formatedDate, oneMonthFormattedDate };
}

export const formatToShortGamesArray = (arry) => {
  let shortArry = [];

  arry.map((game) => {
    let platformsArry = [];
    if (game.platforms) {
      game.parent_platforms.map((platform) => {
        platformsArry.push(platform.platform.name);
      });
    }

    shortArry.push({
      id: game.id,
      title: game.name,
      imgUrl: game.background_image,
      platforms: platformsArry,
    });
  });

  return shortArry;
};

export const delay = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const checkFileExists = async (filename) => {
  try {
    const appDirPath = await appLocalDataDir();
    const mainFolderPath = await join(appDirPath, "game_buddy_files");

    const filePath = await join(mainFolderPath, filename);
    const fileExists = await exists(filePath);

    if (!fileExists) {
      await writeTextFile(filePath);
      console.log("file created\t" + filePath);
    } else {
      console.log("file present already");
    }

    return filePath;
  } catch (error) {
    console.log("There was an Error checking if the file exists\n" + error);
    return;
  }
};

export const changeCatalogType = async (gameObj, changeToType) => {
  try {
    const filePath = await checkFileExists("catalogData.json");
    const fileContents = await readTextFile(filePath);
    console.log("File Contents: \t " + fileContents);

    if (!fileContents) {
      const firstEntry = [
        {
          ...gameObj,
          catalogType: changeToType,
          syncOptions: {
            mode: null,
            saveFileLocation: null,
          },
        },
      ];

      await writeTextFile(filePath, JSON.stringify(firstEntry, null, 2));
      return;
    }

    // fileContents Not empty
    const fileContentsArry = JSON.parse(fileContents);
    console.log(fileContentsArry);

    let itemFound = false;

    let newArry = fileContentsArry.map((game) => {
      if (game.id === gameObj.id) {
        game.catalogType = changeToType;
        console.log("Match Found");
        itemFound = true;
      }
      return game;
    });

    console.log(newArry);

    if (!itemFound) {
      newArry.push({
        ...gameObj,
        catalogType: changeToType,
        syncOptions: {
          mode: null,
          saveFileLocation: null,
        },
      });
      console.log("Item Not found and new added \n" + newArry);
    }

    await writeTextFile(filePath, JSON.stringify(newArry, null, 2));
  } catch (error) {
    console.log("There was an error changing\n" + error);
  }
};

export const readCatalog = async () => {
  try {
    const dirPath = await appLocalDataDir();
    const filePath = await join(dirPath, "game_buddy_files/catalogData.json");

    const fileContents = await readTextFile(filePath);

    if (!fileContents) {
      console.log("Empty file");
      return [];
    }

    console.log(fileContents);
    return JSON.parse(fileContents);
  } catch (error) {
    console.log("There was an error: \n" + error);
  }
};
