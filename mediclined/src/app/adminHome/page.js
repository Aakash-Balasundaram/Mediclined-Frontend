"use client";

import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";

export default function AdminHome() {
  const router = useRouter();

  useEffect(() => {
    role = secureLocalStorage.getItem("role");
    if (role != "A") {
      // navigate to unauthorised page..
      router.push("/")
    }
  }, []);
  return <div>Welcome to admin home</div>;
}
