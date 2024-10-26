"use client";

import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import Head from "./components/header";
import Homies from "./components/dummy";
import EmailSender from "./components/EmailSender";
import Categories from "./components/categories";

export default function AdminHome() {
  const router = useRouter();

  // useEffect(() => {
  //   const role = secureLocalStorage.getItem("role");
  //   if (role != "A") {
  //     // navigate to unauthorised page..
  //     router.push("/403");
  //   }
  // }, []);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row m-4 items-center w-[296px] justify-between">
          <Head />
      </div>
      <div className="flex items-center justify-center">
          <Categories />
      </div>
    </div>
  );

}
