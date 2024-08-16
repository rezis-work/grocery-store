import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import TopCategoryList from "./_components/TopCategoryList";
import ProductList from "@/app/_components/ProductList";

const ProductsCategory = async ({ params }) => {
  const { categoryName } = params;
  const productList = await GlobalApi.getProductsByCategory(categoryName);
  const categoryList = await GlobalApi.getCategoryList();

  if (productList.length === 0)
    return (
      <>
        <TopCategoryList categoryList={categoryList} />
        <div className=" flex items-center px-4">
          <Link href={"/"}>
            <Button>
              Go Back <ArrowBigLeft />
            </Button>
          </Link>
          <h1 className=" p-10 text-lg font-bold text-green-600">
            No products in {categoryName} category yet
          </h1>
        </div>
      </>
    );

  return (
    <div className=" p-5">
      <h2 className=" p-4 bg-green-600 text-white font-bold text-3xl text-center rounded-md">
        {categoryName}
      </h2>
      <TopCategoryList
        categoryList={categoryList}
        selectedCategory={categoryName}
      />
      <ProductList productList={productList} />
    </div>
  );
};

export default ProductsCategory;
