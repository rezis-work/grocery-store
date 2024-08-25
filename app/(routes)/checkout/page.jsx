"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Checkout = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const jwt = sessionStorage.getItem("jwt");
  const [totalCartItem, setToatalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!jwt) {
      router.push("/sign-in");
    }
    getCartItems();
  }, []);

  const getCartItems = async () => {
    if (user) {
      const cartItemList_ = await GlobalApi.getCartItem(user?.id, jwt);
      setToatalCartItem(cartItemList_?.length);
      setCartItemList(cartItemList_);
    }
  };

  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + +element.amount;
    });
    setSubtotal(total);
  }, [cartItemList]);

  const calculateTotalAmount = () => {
    const totalAmount = (subtotal * 9) / 100 + 15 + subtotal;
    return totalAmount.toFixed(2);
  };

  const calculateTax = () => {
    const tax = (subtotal * 9) / 100;
    return tax.toFixed(2);
  };

  const onApprove = (data) => {
    console.log(data);
    const payload = {
      data: {
        paymentId: data.paymentId,
        totalOrderAmount: calculateTotalAmount(),
        username: username,
        email: email,
        phone: phone,
        zip: zip,
        address: address,
        orderItemList: cartItemList,
        userId: user.id,
      },
    };

    GlobalApi.createOrder(payload, jwt).then((res) => {
      console.log(res);
      toast("Order place succesfully");
    });
  };

  return (
    <div>
      <h2 className=" p-3 bg-green-600 text-xl font-bold text-center text-white">
        Checkout
      </h2>
      <div className=" px-5 p-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className=" md:col-span-2 mx-20">
          <h2 className=" font-bold text-3xl">Billing Details</h2>
          <div className=" grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=" grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
          </div>
          <div className=" mt-3">
            <Input
              placeholder="Adress"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className=" mx-10 border">
          <h2 className=" p-3 bg-gray-200 font-bold text-center">
            Total Cart ({totalCartItem})
          </h2>
          <div className=" p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal: <span>${subtotal}</span>
            </h2>
            <hr />
            <h2 className=" flex justify-between">
              Delivery: <span>$15</span>
            </h2>
            <h2 className=" flex justify-between">
              Tax (9%) <span>${calculateTax()}</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total: <span>${calculateTotalAmount()}</span>
            </h2>
            <Button
              className="cursor-pointer"
              onClick={() => onApprove({ paymentid: "123" })}
            >
              Payment
            </Button>
            <PayPalButtons
              onApprove={onApprove}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: calculateTotalAmount(),
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
