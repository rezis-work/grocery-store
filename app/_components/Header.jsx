"use client";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../_utils/GlobalApi";
import { useEffect, useState } from "react";

const Header = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => {
      setCategoryList(res.data.data);
    });
  };
  return (
    <div className=" p-5 shadow-md flex justify-between">
      <div className=" flex items-center gap-8">
        <Image
          src="/logo.png"
          alt="logo"
          width={90}
          height={90}
          className="rounded-xl"
        />
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <h2 className=" hidden md:flex gap-2 items-center border rounded-full px-10 py-2 bg-slate-200 cursor-pointer">
                <LayoutGrid className=" h-5 w-5" /> Category
              </h2>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Browse category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categoryList.map((category) => (
                <DropdownMenuItem
                  className=" cursor-pointer flex items-center gap-2"
                  key={category.id}
                >
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                      category.attributes?.icon?.data[0]?.attributes?.url
                    }
                    alt="icon"
                    width={23}
                    height={23}
                  />
                  <h2>{category.attributes.name}</h2>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className=" md:flex gap-3 items-center border rounded-full p-2 px-5 hidden">
          <Search />
          <input type="text" placeholder="Search" className=" outline-none" />
        </div>
      </div>
      <div className=" flex gap-5 items-center">
        <h2 className=" flex gap-2 items-center text-lg">
          <ShoppingBag /> 0
        </h2>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Header;
