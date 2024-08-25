import Image from "next/image";
import React from "react";

const MyOrderItem = ({ orderItem }) => {
  console.log(orderItem);
  return (
    <div className=" grid grid-cols-5 w-[35%]">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          orderItem.product.data.attributes.images.data[0].attributes.url
        }
        width={80}
        height={80}
        alt="order images"
        className=" bg-gray-100 p-2 border rounded-lg"
      />
      <div className=" col-span-2">
        <h2>{orderItem.product.data.attributes.name}</h2>
        <h2> Item Price: ${orderItem.product.data.attributes.mrp}</h2>
      </div>
      <h2>Quantity: {orderItem.quantity}</h2>
      <h2>Price: {orderItem.price}</h2>
    </div>
  );
};

export default MyOrderItem;
