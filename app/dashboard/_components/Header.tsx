import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton } from "@clerk/nextjs";
import { MenuIcon, Search } from "lucide-react";
import {
  ArrowLeftSquare,
  FileClock,
  Home,
  Settings,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const MenuList = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Setting",
      icon: Settings,
      path: "/dashboard/setting",
    },
    {
      name: "Back",
      icon: ArrowLeftSquare,
      path: "/",
    },
  ];

  const pathName = usePathname();

  return (
    <div className="-5 shadow-sm bg-white border-b-2 flex justify-between items-center">
      <div
        className="flex gap-2 items-center 
        p-2 border rounded-md max-w-lg "
      >
        <Search />
        <input type="text" placeholder="Search..." className="outline-none" />
      </div>
      <hr className="my-6 border" />

      <div className="mt-3 flex gap-5 items-center px-5">
        <div className="md:hidden flex">
          <Sheet>
            <SheetTrigger className="text-primary">
              <MenuIcon className="w-7 h-7" />
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col items-center h-screen justify-center gap-5">
                {MenuList.map((menu, index) => {
                  return (
                    <Link href={menu.path} key={index}>
                      <div
                        className={`flex gap-2 mb-2 px-3 py-2 hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center ${
                          pathName === menu.path ? "bg-primary text-white" : ""
                        }`}
                      >
                        <menu.icon className="h-6 w-6" />
                        <h2 className="text-lg">{menu.name}</h2>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Link href={'/dashboard/billing'}>
        <h2 className="bg-primary hidden lg:block p-1 rounded-full text-xs text-white px-2">
          🔥Join Membership just for Rs.50/month
        </h2>
        </Link>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
