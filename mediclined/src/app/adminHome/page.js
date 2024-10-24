"use client";

import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";

import EmailSender from "./components/EmailSender";

export default function AdminHome() {
  const router = useRouter();

  useEffect(() => {
    const role = secureLocalStorage.getItem("role");
    if (role != "A") {
      // navigate to unauthorised page..
      router.push("/403");
    }
  }, []);
  return (
    <div>
      Welcome to admin home
      <EmailSender />
    </div>
  );
}
