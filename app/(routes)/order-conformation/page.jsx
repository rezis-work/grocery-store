import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import React from "react";

const OrderConformation = () => {
  return (
    <div className=" flex justify-center my-20">
      <div className=" border shadow-md flex flex-col justify-center p-20 rounded-md items-center gap-3 px-32">
        <CheckCircle2 className=" h-24 w-24 text-green-600" />
        <h2 className=" font-medium text-3xl text-green-600">
          Order Succsesfully sent
        </h2>
        <h2>Thank you so much</h2>
        <Button className="bg-green-600 mt-8">Track your order</Button>
      </div>
    </div>
  );
};

export default OrderConformation;
