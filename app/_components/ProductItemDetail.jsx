"use client";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ProductItemDetail = ({ product }) => {
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(
    product.attributes.sellingPrice
      ? product.attributes.sellingPrice
      : product.attributes.mrp
  );
  const handleAdd = () => {
    setCount((prev) => prev + 1);
  };
  const handleMinus = () => {
    if (count === 1) return;
    setCount((prev) => prev - 1);
  };
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 bg-white text-black">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product.attributes.images.data[0].attributes.url
        }
        width={300}
        height={300}
        alt={product.attributes.name}
        className=" bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg"
      />
      <div className=" flex flex-col gap-3">
        <h2 className=" text-2xl font-bold">{product.attributes.name}</h2>
        <h2 className=" text-sm font-bold text-gray-500">
          {product.attributes.description}
        </h2>
        <div className=" flex items-center gap-2">
          {product.attributes.sellingPrice && (
            <h2 className=" text-3xl font-bold">
              ${product.attributes.sellingPrice}
            </h2>
          )}
          <h2
            className={` ${
              product.attributes.sellingPrice
                ? "line-through  font-bold text-sm text-gray-500"
                : "font-bold"
            }`}
          >
            ${product.attributes.mrp}
          </h2>
        </div>
        <h2 className=" font-medium text-lg">
          Quantity ({product.attributes.itemQuantityType})
        </h2>
        <div className=" flex flex-col items-baseline">
          <div>
            <div className=" flex gap-2 items-center">
              <div className=" p-2 border flex items-center gap-10 px-5">
                <Button onClick={handleMinus} disbled varient="outline">
                  -
                </Button>
                <h2>{count}</h2>
                <Button onClick={handleAdd} varient="outline">
                  +
                </Button>
              </div>
              <h2 className=" mt-2 font-bold text-lg">
                = ${(total * count).toFixed(2)}
              </h2>
            </div>
          </div>
          <Button className="flex items-center gap-3 mt-3">
            <ShoppingBasket />
            Add to cart
          </Button>
        </div>
        <h2>
          {" "}
          <span className=" font-bold">Category:</span>{" "}
          {product.attributes.categories.data[0].attributes.name}{" "}
        </h2>
      </div>
    </div>
  );
};

export default ProductItemDetail;
