"use client";

import { 
          ArrowLeftSquare, 
          FileClock, 
          Home, 
          Settings, 
          WalletCards 
        } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import UsageTracker from "./UsageTracker";
import Link from "next/link";

const SideNav = () => {
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
    <div className="h-screen relative p-5 shadow-sm border bg-white">
      <div className="flex justify-center">
        <Image src={"/logo.svg"} alt="logo image" width={100} height={100} />
      </div>
      <div className="mt-10">
        {MenuList.map((menu, index) => {
          return (
            <Link href={menu.path} key={index}>
              <div
                className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center ${
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
      <div className="absolute bottom-10 left-0 w-full">
        <UsageTracker />
      </div>
    </div>
  );
};

export default SideNav;
