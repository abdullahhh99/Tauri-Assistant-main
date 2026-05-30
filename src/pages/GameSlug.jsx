import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import singleGame from "../../single_game_data.json";
import ss from "../../ssData.json";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Button } from "@/Components/ui/button";
import SpinLoader from "@/Components/SpinLoader";
import BarLoading from "@/Components/BarLoading";

const RAWG_KEY = import.meta.env.VITE_RAWG_API;

const GameSlug = () => {
  const { game } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingScreenshots, setIsLoadingScreenshots] = useState(false);
  const [error, setError] = useState(false);
  const [ssError, setSsError] = useState(false);
  const [gameData, setGameData] = useState({});
  const [screenshots, setScreenShots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        let { data } = await axios.get(
          `https://api.rawg.io/api/games/${game}?key=${RAWG_KEY}`
        );

        console.log(data);
        const {
          name,
          description,
          description_raw,
          released,
          background_image,
          platforms,
          parent_platforms,
        } = data;

        let platformNames = [];

        parent_platforms.map((plt) => {
          platformNames.push(plt.platform.name);
        });

        let requirements = "";

        platforms.map((plt) => {
          if (plt.platform.name === "PC") {
            requirements = plt.requirements.minimum;
            return;
          }
        });

        setGameData({
          name,
          description,
          description_raw,
          released,
          background_image,
          platforms: platformNames,
          requirements,
        });

        return;
      } catch (error) {
        console.log(error);
      }
    };

    const fetchScreenShots = async () => {
      try {
        const { data } = await axios.get(
          `https://api.rawg.io/api/games/${game}/screenshots?key=${RAWG_KEY}`
        );

        console.log(data);

        let screenshotsArry = [];

        data.results.map((ss) => {
          screenshotsArry.push({ id: ss.id, imgUrl: ss.image });
        });

        setScreenShots(screenshotsArry);
      } catch (error) {
        console.log(error);
        return;
      }
    };

    async function callingFn() {
      setIsLoading(true);
      await fetchGameDetails();
      setIsLoading(false);
      setIsLoadingScreenshots(true);
      await fetchScreenShots();
      setIsLoadingScreenshots(false);
    }

    callingFn();
  }, []);

  const {
    name,
    description,
    requirements,
    description_raw,
    released,
    background_image,
    platforms,
  } = gameData;

  let dateFormat = "";

  if (released) {
    dateFormat = released.split("-").reverse().join("/");
  }

  // platforms.map((plt) => {
  //   if (plt.platform.name === "PC") {
  //     pcRequirements = plt.requirements.minimum;
  //     return;
  //   }
  // });

  let screenshotsArry = [];

  // ss.results.map((ss) => {
  //   screenshotsArry.push({ id: ss.id, imgUrl: ss.image });
  // });

  return (
    <section className="h-[40rem] pb-18 scrollbar scrollbar-thumb-gray-700 overflow-y-auto custom-scrollbar relative">
      <h2 className="text-3xl font-bold text-center mt-4">Game Information</h2>
      <Button
        className={
          "fixed top-10 left-30 rounded-full border-1 border-midnight-accent accent-bg w-15 h-10"
        }
        onClick={() => {
          navigate(-1);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            fill="#f0f8ff"
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
          />
        </svg>
      </Button>
      {isLoading ? (
        <SpinLoader />
      ) : error ? (
        <div className="max-w-max w-full h-[30rem] align-middle flex mx-auto items-center">
          <p className="text-4xl text-center text-gray-600 italic ">
            There was an Error Loading the Page
          </p>
        </div>
      ) : (
        <>
          <article className="mt-20 flex gap-6 max-w-2xl mx-auto">
            <div className="w-52 h-52">
              {background_image ? (
                <img
                  className="object-cover w-full h-full"
                  src={background_image}
                  alt={name}
                />
              ) : (
                <div className="w-full h-full text-gray-600 text-sm italic flex items-center justify-center bg-gray-900">
                  <p>No Image</p>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-2xl">{name}</h3>
              <div className="h-1 rounded-2xl mt-3 mb-6 w-full accent-bg"></div>
              <h3 className="mt-1">Released: {dateFormat}</h3>
              <h3 className="mt-3">Available Platforms</h3>
              <div className="flex flex-wrap gap-2 mt-2 max-w-60">
                {platforms && platforms.length > 0 ? (
                  platforms.map((plt, i) => {
                    return (
                      <p
                        key={i}
                        className="text-white text-xs bg-blue-400 w-max py-1 px-2 rounded-2xl cursor-default"
                      >
                        {plt}
                      </p>
                    );
                  })
                ) : (
                  <p className="text-gray-600 italic text-xs">N/A</p>
                )}
              </div>
            </div>
          </article>

          <article className="max-w-3xl mx-auto italic font-extralight text-sm text-left mt-12 px-4">
            <h2 className="text-xl font-bold not-italic mb-2">Description</h2>
            <p>
              {description_raw ? (
                description_raw
              ) : (
                <span className="text-center italic text-gray-600">
                  No Description Found
                </span>
              )}
            </p>
          </article>

          <article className="px-4">
            <table className="table-auto max-w-xl mt-12 mx-auto border-collapse border border-slate-400">
              <thead>
                <tr>
                  <th className="border border-slate-300 p-2">
                    <h2>Minimum Requirements</h2>
                  </th>
                </tr>
              </thead>
              <tbody>
                {requirements ? (
                  requirements.split("\n").map((str, index) => {
                    if (str.toLowerCase().match("minimum")) {
                      return;
                    }
                    return (
                      <tr key={index}>
                        <td className="border border-slate-300 p-2">{str}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="border border-slate-300 font-bold text-gray-600 p-2 italic text-center">
                      Not Found Any
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </article>

          <article className="mt-12 px-12 max-w-4xl mx-auto">
            {isLoadingScreenshots ? (
              <div className="flex flex-col items-center justify-center my-2 w-full h-16 bg-transparent">
                <BarLoading />
                <span className="text-gray-600 text-sm text-center pt-4">
                  Loading Screenshots...
                </span>
              </div>
            ) : ssError ? (
              <div className="w-full mt-4">
                <p className="text-2xl text-gray-600 text-center italic">
                  Screenshots Not Available
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                <PhotoProvider>
                  {screenshots.length > 0 ? (
                    screenshots.map((obj) => {
                      return (
                        <PhotoView src={obj.imgUrl}>
                          <div key={obj.id} className="w-sm cursor-pointer">
                            <img
                              src={obj.imgUrl}
                              alt={obj.id}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </PhotoView>
                      );
                    })
                  ) : (
                    <div className="w-full mt-4">
                      <p className="text-2xl text-gray-600 text-center italic">
                        Screenshots Not Available
                      </p>
                    </div>
                  )}
                </PhotoProvider>
              </div>
            )}
          </article>

          <article className="mx-auto max-w-3xl mt-8">
            <h2 className="mt-2 text-2xl font-bold">Useful Links</h2>
            <div className="max-w-xl mx-auto mt-4">
              <div className="flex justify-between items-center">
                <h3>How long it usually takes to beat the Game</h3>
                <Button
                  className={
                    "p-0 pr-2 bg-charcoal-accent border-1 border-charcoal-accent rounded-none"
                  }
                >
                  <img
                    src="/logos/hltb_logo.png"
                    alt=""
                    className="w-10 object-cover h-full"
                  />
                  <a href="pr-3">HowLongToBeat</a>
                </Button>
              </div>

              <div className="flex justify-between items-center mt-4">
                <h3>Will it run on your specific system?</h3>
                <Button
                  className={
                    "p-0 pr-2 border-1 border-midnight-accent rounded-none bg-midnight-accent"
                  }
                >
                  <img
                    src="/logos/pcgamesbenchmark-logo.png"
                    alt="PCGamesBenchMark"
                    className="w-9 h-[35px] object-cover"
                  />
                  <a href="">PCGameBenchmark</a>
                </Button>
              </div>
              <div className="flex justify-between items-center mt-4">
                <h3>Get the game for an exciting price {":)"}</h3>
                <Button
                  className={
                    "p-0 pr-2 w-28 rounded-none bg-orange-700 border-1 border-orange-700"
                  }
                >
                  <img
                    src="/logos/1337x_logo.png"
                    alt="1337x.to"
                    className="w-10 h-full object-cover "
                  />
                  <a href="">1337x.to</a>
                </Button>
              </div>
            </div>
          </article>
        </>
      )}
    </section>
  );
};

export default GameSlug;
