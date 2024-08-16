import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopCategoryList = ({ categoryList, selectedCategory }) => {
  return (
    <div className="flex gap-5 mt-2 overflow-auto mx-7 md:mx-20 justify-center">
      {categoryList.map((list) => (
        <Link
          href={"/products-category/" + list.attributes.name}
          key={list.id}
          className={`flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg cursor-pointer group hover:bg-green-100 w-[150px] min-w-[100px] ${
            selectedCategory === list.attributes.name
              ? " bg-green-600 text-white"
              : "bg-green-50 text-green-600"
          }`}
        >
          <Image
            src={
              process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
              list.attributes.icon.data[0].attributes.url
            }
            width={50}
            height={50}
            alt="icon"
            className=" group-hover:scale-125 transition-all ease-in-out"
          />
          <h2 className=" text-green-800">{list.attributes.name}</h2>
        </Link>
      ))}
    </div>
  );
};

export default TopCategoryList;
