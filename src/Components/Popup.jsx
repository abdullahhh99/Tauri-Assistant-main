import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Popup = ({
  children,
  headTitle,
  setIsOpen,
  isOpen,
  gamePath = null,
  setGamePath = null,
}) => {
  const [transitionClasses, setTransitionClasses] = useState(
    "opacity-0 translate-y-4"
  );

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setTransitionClasses("opacity-100 translate-y-0");
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setTransitionClasses("opacity-0 translate-y-4");
    }
  }, [isOpen]);

  if (!isOpen && transitionClasses === "opacity-0 translate-y-4") {
    return null;
  }

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full z-20 test backdrop-opacity-20`}
    >
      <Card
        className={`w-full max-w-sm lg:max-w-max absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] bg-gray-700 p-4 transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`realtive transform transition-all duration-300 ease-out ${transitionClasses}`}
        >
          <h3 className="text-lg">{headTitle}</h3>
          <div className="accent-bg h-1 w-20 rounded-xl mx-auto mt-2 mb-6"></div>
          <Button
            className={"absolute top-0 right-0 bg-red-500"}
            onClick={() => {
              if (gamePath) {
                setGamePath("");
              }
              setIsOpen(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                fill="#fafcff"
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              />
            </svg>
          </Button>
          {children}
        </div>
      </Card>
    </div>
  );
};

export default Popup;
