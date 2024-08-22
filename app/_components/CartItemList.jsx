"use client";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CartItemList = ({ cartItemList, onDeleteItem }) => {
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + +element.amount;
    });
    setSubtotal(total.toFixed(2));
  }, []);

  console.log(subtotal);

  return (
    <div>
      <div className=" h-[500px] overflow-y-auto p-2 border">
        {cartItemList.map((cart) => (
          <div key={cart.id}>
            <div className=" flex gap-6 items-cente mb-2">
              <Image
                src={cart.image}
                width={70}
                height={70}
                alt="cart item"
                className=" border rounded-md p-2"
              />
              <div>
                <h2 className=" font-bold">{cart.name}</h2>
                <h2>Quantity - {cart.quantity}</h2>
                <h2 className=" text-lg font-bold">${cart.amount}</h2>
              </div>
              <TrashIcon
                onClick={() => onDeleteItem(cart.id)}
                className=" ml-auto mr-3 text-red-500 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
      <div className=" mt-10">
        <h2 className=" flex gap-4 items-center">
          <span>Subtotal = {subtotal}$</span>
          <Button className=" bg-green-600">View Cart</Button>
        </h2>
      </div>
    </div>
  );
};

export default CartItemList;
