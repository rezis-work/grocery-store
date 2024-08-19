"use client";

import { CircleUserRound, LayoutGrid, Search, ShoppingBag } from "lucide-react";
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
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Header = ({ children }) => {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState([]);
  const isLogin = sessionStorage.getItem("jwt") ? true : false;
  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => {
      setCategoryList(res.data.data);
    });
  };

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/create-account");
  };

  const params = usePathname();
  const showHeader =
    params === "/sign-in" || params === "/create-account" ? true : false;

  console.log(showHeader);

  if (showHeader) return <div></div>;

  return (
    <div className=" p-5 shadow-md flex justify-between">
      <div className=" flex items-center gap-8">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="logo"
            width={90}
            height={90}
            className="rounded-xl"
          />
        </Link>
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
                <Link
                  key={category.id}
                  href={`/products-category/${category.attributes.name}`}
                >
                  <DropdownMenuItem className=" cursor-pointer flex items-center gap-2">
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
                </Link>
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
        {!isLogin ? (
          children
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className=" w-12 h-12 bg-green-100 text-green-700 p-2 rounded-full cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>My Order</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSignOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
