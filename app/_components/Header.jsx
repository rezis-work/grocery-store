"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CircleUserRound,
  LayoutGrid,
  Search,
  ShoppingBag,
  ShoppingBasket,
} from "lucide-react";
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
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import CartItemList from "./CartItemList";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Header = ({ children }) => {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState([]);
  const isLogin = sessionStorage.getItem("jwt") ? true : false;
  const user = JSON.parse(sessionStorage.getItem("user"));
  const jwt = sessionStorage.getItem("jwt");
  const [totalCartItem, setToatalCartItem] = useState(0);
  const { updateCart } = useContext(UpdateCartContext);
  const [cartItemList, setCartItemList] = useState([]);

  useEffect(() => {
    user && getCartItems();
  }, [updateCart]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => {
      setCategoryList(res.data.data);
    });
  };

  const getCartItems = async () => {
    if (user) {
      const cartItemList_ = await GlobalApi.getCartItem(user?.id, jwt);
      setToatalCartItem(cartItemList_?.length);
      setCartItemList(cartItemList_);
    }
  };

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/create-account");
  };

  const onDeleteItem = (id) => {
    GlobalApi.deleteCartItem(id, jwt).then((res) => {
      toast("item removed");
      getCartItems();
    });
  };

  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + +element.amount;
    });
    setSubtotal(total.toFixed(2));
  }, [cartItemList]);

  const params = usePathname();
  const showHeader =
    params === "/sign-in" || params === "/create-account" ? true : false;

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
        <Sheet>
          <SheetTrigger asChild>
            <h2 className=" flex gap-2 items-center text-lg">
              <ShoppingBasket className=" h-7 w-7 cursor-pointer" />
              <span className=" bg-green-600 text-white px-2 rounded-full">
                {totalCartItem}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="flex items-center gap-3 bg-green-600 text-white text-lg font-bold  mt-7 p-3 rounded-lg justify-center">
                {user?.username}'s {"  "} Cart <ShoppingBag />{" "}
              </SheetTitle>
              <SheetDescription>
                <CartItemList
                  cartItemList={cartItemList}
                  onDeleteItem={onDeleteItem}
                />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className=" mt-10">
                <h2 className=" flex gap-4 items-center">
                  <span>Subtotal = {subtotal}$</span>
                  <Button
                    onClick={() => router.push(jwt ? "/checkout" : "sign-in")}
                    className=" bg-green-600"
                  >
                    Checkout
                  </Button>
                </h2>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>
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
