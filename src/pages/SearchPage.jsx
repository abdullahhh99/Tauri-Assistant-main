import Searchbar from "@/Components/Searchbar";
import React, { useEffect, useState } from "react";
import gamesList from "../testingData.json";
import { CardContent, Card as SmallCard } from "@/Components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/Components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import TooltipMenu from "@/Components/TooltipMenu";
import {
  delay,
  fetchGames,
  formatDate,
  formatToShortGamesArray,
  getTodayAndOneMonthAgoDates,
} from "@/lib/utils";
import SpinLoader from "@/Components/SpinLoader";
import { Link } from "react-router";

const SearchPage = () => {
  const [gameList, setGameList] = useState(gamesList);
  const [carouselList, setCarouselList] = useState([]);
  const [topCharts, setTopCharts] = useState([]);
  const [topReleases, setTopRelease] = useState([]);
  const [topIndie, setTopIndie] = useState([]);
  const [topUpcoming, setTopUpcoming] = useState([]);
  const [loadingMain, setLoadingMain] = useState(false);

  useEffect(() => {
    // First and foremost check the internet connection before making API Calls
    const fetchCarouselGames = async () => {
      const { formatedDate, oneMonthFormattedDate } =
        getTodayAndOneMonthAgoDates();

      const { response, error } = await fetchGames(
        `page_size=8&dates=${`2024-06-26`},${formatedDate}&ordering=-rating`
      );

      if (error) {
        console.log(error);
        return;
      }

      console.log(response);

      const carouselArry = formatToShortGamesArray(response);

      setCarouselList(carouselArry);

      return;
    };

    const fetchTopChartsGames = async () => {
      const { response, error } = await fetchGames(
        `page_size=10&ordering=-rating`
      );

      if (error) {
        console.log(error);
        return;
      }

      console.log(response);

      const topChartsArry = formatToShortGamesArray(response);

      setTopCharts(topChartsArry);

      // set()
    };

    const fetchTopReleasesGames = async () => {
      const { formatedDate, oneMonthFormattedDate } =
        getTodayAndOneMonthAgoDates();

      const { response, error } = await fetchGames(
        `page_size=10&dates=${oneMonthFormattedDate},${formatedDate}&ordering=-released`
      );

      if (error) {
        console.log(error);
        return;
      }

      const topReleasesArry = formatToShortGamesArray(response);
      setTopRelease(topReleasesArry);
    };
    const fetchTopIndieGames = async () => {
      const today = new Date();
      const todayDate = formatDate(today);
      today.setFullYear(today.getFullYear() - 1);
      const oneYearAgo = formatDate(today);

      const { response, error } = await fetchGames(
        `page_size=10&genres=indie&dates=${oneYearAgo},${todayDate}&ordering=-rating`
      );

      if (error) {
        console.log(error);
        return;
      }

      console.log(response);

      const topIndieArry = formatToShortGamesArray(response);
      setTopIndie(topIndieArry);
    };

    const fetchTopUpcomingGames = async () => {
      const today = new Date();
      const todayFomratted = formatDate(today);

      today.setFullYear(today.getFullYear() + 1);
      const oneYearAfter = formatDate(today);

      const { response, error } = await fetchGames(
        `page_size=10&dates=${todayFomratted},${oneYearAfter}&ordering=released`
      );
      if (error) {
        console.log(error);
        return;
      }

      console.log(response);

      const topUpcomingArry = formatToShortGamesArray(response);
      setTopUpcoming(topUpcomingArry);
    };

    setLoadingMain(true);

    const callingFn = async () => {
      setLoadingMain(true);
      // await delay(3000);
      // await fetchCarouselGames();
      // await fetchTopChartsGames();
      // await fetchTopReleasesGames();
      // await fetchTopIndieGames();
      // await fetchTopUpcomingGames();
      setLoadingMain(false);
    };

    callingFn();

    // fetchCarouselGames();
    // fetchTopChartsGames();
    // fetchTopReleasesGames();
    // fetchTopIndieGames();
    // fetchTopUpcomingGames();

    // setLoadingMain(false);
  }, []);

  const testingCarousel = [
    {
      url: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1222140/capsule_616x353.jpg?t=1667468479",
    },
    {
      url: "https://c4.wallpaperflare.com/wallpaper/283/682/371/girl-face-background-sweetheart-wallpaper-preview.jpg",
    },
    {
      url: "https://images.gog-statics.com/8355e657a19311b158a3553a154e109199d6991c7791a20c3305af1f84d15ed7.jpg",
    },
  ];

  return (
    <section className="font-nacelle text-center">
      <div className="max-w-xl w-4/5 mx-auto mb-4">
        <Searchbar
          list={gameList}
          setList={setGameList}
          isUniversalSearch={true}
          loading={loadingMain}
        />
      </div>
      <div className="overflow-y-scroll pb-32 lg:pb-8 h-[38rem]  scrollbar custom-scrollbar scrollbar-thumb-midnight-accent ">
        {/* Carousel */}

        {loadingMain ? (
          <SpinLoader />
        ) : (
          <div className="max-w-sm md:max-w-xl lg:max-w-4xl w-11/12 mx-auto mt-4 cursor-pointer">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: false,
                  stopOnMouseEnter: true,
                }),
              ]}
            >
              <CarouselContent>
                {carouselList.map((game, i) => {
                  const { title, imgUrl, platforms, id } = game;

                  return (
                    <CarouselItem>
                      <Link to={`/search/${id}`}>
                        <div
                          className="h-64 md:h-96 w-full bg-transparent overflow-hidden relative group"
                          key={i}
                        >
                          <img
                            className="w-full h-full rounded-lg object-cover"
                            src={imgUrl}
                            alt={title}
                          />
                          <div className="w-full h-[50%] absolute rounded-b-lg bg-transparent backdrop-blur-lg bottom-0 left-0 translate-y-56 group-hover:translate-y-0 transition-all">
                            <h1>{title}</h1>
                            <span>{platforms.map((plt) => `${plt}`)}</span>
                          </div>
                        </div>
                      </Link>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
            </Carousel>

            {/* Top Charts */}
            <article className="mt-12 cursor-default">
              <h2 className="mb-4 text-left text-3xl font-bold text-charcoal-accent">
                Top Charts
              </h2>
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full max-w-4xl"
              >
                <CarouselContent>
                  {topCharts.map((game, index) => {
                    const { id } = gameList;
                    return (
                      <CarouselItem
                        key={id}
                        className="md:basis-1/2 lg:basis-1/5"
                      >
                        <SmallCardComp item={game} />
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </article>

            {/* Top Releases */}
            <article className="mt-12 cursor-default">
              <h2 className="mb-4 text-left text-3xl font-bold text-charcoal-accent">
                Top Releases
              </h2>
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full max-w-4xl"
              >
                <CarouselContent>
                  {topReleases.map((game, index) => {
                    const { id } = gameList;
                    return (
                      <CarouselItem
                        key={id}
                        className="md:basis-1/2 lg:basis-1/5"
                      >
                        <SmallCardComp item={game} />
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </article>
            {/* Top Indie Games */}
            <article className="mt-12 cursor-default">
              <h2 className="mb-4 text-left text-3xl font-bold text-charcoal-accent">
                Top Indie Games
              </h2>
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full max-w-4xl"
              >
                <CarouselContent>
                  {topIndie.map((game, index) => {
                    const { id } = gameList;
                    return (
                      <CarouselItem
                        key={id}
                        className="md:basis-1/2 lg:basis-1/5"
                      >
                        <SmallCardComp item={game} />
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </article>
            {/* Top Upcoming Games */}
            <article className="mt-12 cursor-default">
              <h2 className="mb-4 text-left text-3xl font-bold text-charcoal-accent">
                Top Upcoming Games
              </h2>
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full max-w-4xl"
              >
                <CarouselContent>
                  {gamesList.map((game, index) => {
                    const { id } = gameList;
                    return (
                      <CarouselItem
                        key={id}
                        className="md:basis-1/2 lg:basis-1/5"
                      >
                        <SmallCardComp item={game} />
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </article>
          </div>
        )}
      </div>
    </section>
  );
};

const SmallCardComp = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { id, title, imgUrl } = item;
  console.log(item);

  return (
    <SmallCard
      onMouseLeave={() => setIsHovered(false)}
      className={
        "relative h-40 w-full cursor-pointer border border-noir-accent"
      }
    >
      <CardContent className="w-full h-full relative overflow-hidden">
        <div className="w-full h-full">
          <Link to={`/search/${id}`}>
            <img
              className="object-cover w-full h-full rounded-xl"
              src={imgUrl}
              alt={title}
            />
          </Link>
          <button
            className={
              "transition-all cursor-pointer rounded-sm absolute top-[50%] -translate-y-1/2 left-0 -translate-x-10/12 hover:translate-x-0 size-12 accent-bg hover:bg-transparent "
            }
            onClick={() => setIsHovered(true)}
          >
            <div className="p-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  fill="#74C0FC"
                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                />
              </svg>
            </div>
          </button>
        </div>
      </CardContent>
      {isHovered && (
        <div className="absolute -bottom-0 left-0 bg-gray-700 rounded-sm z-10 bounce-in-down tooltip before:absolute before:-top-1.5 before:left-[40%] before:border-l-6 before:border-r-6 before:border-b-6 before:border-transparent before:border-b-gray-700">
          <TooltipMenu gameObj={item} />
        </div>
      )}
    </SmallCard>
  );
};

export default SearchPage;
