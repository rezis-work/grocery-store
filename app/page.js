import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Image from "next/image";
import Footer from "./_components/Footer";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();

  const categoryList = await GlobalApi.getCategoryList();

  const productList = await GlobalApi.getAllProducts();

  return (
    <div className="p-10 px-16">
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList} />
      <ProductList productList={productList} />
      <Image
        src="/footer-banner.png"
        width={1000}
        height={300}
        alt="banner"
        className=" w-full h-[400px] object-cover rounded-xl mt-10"
      />
      <Footer />
    </div>
  );
}
