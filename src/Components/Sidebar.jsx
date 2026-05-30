import { Search, Settings, User } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router";

const Sidebar = () => {
  return (
    <aside className="flex flex-col gap-6 align-middle justify-center p-2 accent-bg shadow-2xl sidebar z-10 transition-colors">
      <Link to={"/search"}>
        <Button
          variant={"secondary"}
          size="icon"
          className="size-11 cursor-pointer hover:scale-[1.1] transition-all button group"
        >
          <Search className="group-hover:text-white transition-all" />
        </Button>
      </Link>
      <Link to={"/"}>
        <Button
          variant="secondary"
          size="icon"
          className="size-11 cursor-pointer hover:scale-[1.1] hover:shadow hover:shadow-blue-950 transition-all button group"
        >
          <User className="group-hover:text-white transition-all" />
        </Button>
      </Link>
      <Link to={"/settings"}>
        <Button
          variant="secondary"
          size="icon"
          className="size-11 cursor-pointer hover:scale-[1.1] hover:shadow hover:shadow-blue-950 transition-all button group"
        >
          <Settings className="group-hover:text-white transition-all" />
        </Button>
      </Link>
    </aside>
  );
};

export default Sidebar;
