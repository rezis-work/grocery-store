import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductItemDetail from "./ProductItemDetail";

const ProductItem = ({ product }) => {
  return (
    <div className="p-2 lg:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg hover:scale-105 hover:shadow-md transition-all ease-in-out cursor-pointer">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product.attributes.images.data[0].attributes.url
        }
        width={500}
        height={500}
        alt="product name"
        className=" h-[200px] w-[200px] object-contain"
      />
      <h2 className=" font-bold text-lg">{product.attributes.name}</h2>
      <div className=" flex items-center gap-2">
        {product.attributes.sellingPrice && (
          <h2 className=" font-bold">${product.attributes.sellingPrice}</h2>
        )}
        <h2
          className={` ${
            product.attributes.sellingPrice
              ? "line-through font-bold text-sm text-gray-500"
              : "font-bold"
          }`}
        >
          ${product.attributes.mrp}
        </h2>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className=" text-primary hover:text-white  hover:bg-green-600"
          >
            Add to cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{product.attributes.name}</DialogTitle>
            <DialogDescription>
              <ProductItemDetail product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductItem;
