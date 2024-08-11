import { Button } from "@/components/ui/button";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  return (
    <div className="p-10 px-16">
      <Slider sliderList={sliderList} />
    </div>
  );
}
