import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CartItemList = ({ cartItemList, onDeleteItem }) => {
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
    </div>
  );
};

export default CartItemList;
