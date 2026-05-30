import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import Sidebar from "./Components/Sidebar";
import { useAppContext } from "./Context/AppContext";
import GameSlug from "./pages/GameSlug";
import { appLocalDataDir, join } from "@tauri-apps/api/path";
import {
  exists,
  mkdir,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/plugin-fs";

function App() {
  useEffect(() => {
    const initializeApp = async () => {
      console.log("initializing...");
      try {
        const appDataDir = await appLocalDataDir();
        console.log(appDataDir);

        const customSubfolderName = "game_buddy_files";
        const fullCustomSubfolderPath = await join(
          appDataDir,
          customSubfolderName
        );
        console.log(`Target Subfolder Path: ${fullCustomSubfolderPath}`);

        const configFileName = "config.json";
        const configFilePath = await join(
          fullCustomSubfolderPath,
          configFileName
        );

        const catalogDataFileName = "catalogData.json";
        const catalogDataFilePath = await join(
          fullCustomSubfolderPath,
          catalogDataFileName
        );

        // 2. Check if this is the first run (by checking if the config file exists)
        const isConfigExists = await exists(configFilePath);

        if (!isConfigExists) {
          console.log("First run: Creating directory and initial files.");
          // Ensure the custom subfolder exists
          const subfolderExists = await exists(fullCustomSubfolderPath);
          if (!subfolderExists) {
            await mkdir(fullCustomSubfolderPath, { recursive: true });
            console.log(`Created directory: ${fullCustomSubfolderPath}`);

            const defaultConfigContent = {
              version: "1.0.0",
              settings: {
                theme: "midnight",
                language: "en",
              },
            };

            await writeTextFile(
              configFilePath,
              JSON.stringify(defaultConfigContent, null, 2)
            );

            console.log(`Created and wrote to: ${configFilePath}`);

            // initial setup completed at this point
          } else {
            const currentConfig = await readTextFile(configFilePath);
            console.log("Current config.json content:", currentConfig);
          }
        }
      } catch (error) {
        console.log("There was an error intializing\n" + error);
      }
    };

    initializeApp();
  }, []);

  const { theme, setTheme } = useAppContext();

  return (
    <main
      className={`h-screen flex ${theme} font-nacelle font-normal overflow-hidden`}
    >
      <BrowserRouter>
        <Sidebar />
        <div className={`flex-1 p-6 ${theme}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/:game" element={<GameSlug />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  );
}

export default App;
