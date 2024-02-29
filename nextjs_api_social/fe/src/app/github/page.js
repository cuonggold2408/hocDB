"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Github({ searchParams }) {
  const router = useRouter();
  const queryString = new URLSearchParams(searchParams).toString();
  useEffect(() => {
    console.log("a");
    const dataUser = async () => {
      try {
        const dataUrl = await fetch(
          "http://localhost:3001/api/v1/auth/github/callback?" + queryString
        );
        // console.log(await dataUrl.json());
        const data = await dataUrl.json();
        console.log(data);
        const accessToken = data.result.accessToken;
        const refreshToken = data.result.refreshToken;
        if (accessToken && refreshToken) {
          Cookies.set("accessToken", accessToken, { expires: 0.04, path: "/" });
          Cookies.set("refreshToken", refreshToken, {
            expires: 14,
            path: "/",
          });
          router.push("/");
        } else {
          router.push("/login");
        }
      } catch (e) {
        console.log(e);
      }
    };
    dataUser();
  }, []);
  return <div>Github</div>;
}
