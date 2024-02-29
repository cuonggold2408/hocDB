"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  // const [url, setUrl] = useState("");
  const router = useRouter();
  const path = usePathname();
  const getGoogle = async (e) => {
    e.preventDefault();
    try {
      const dataUrl = await fetch("http://localhost:3001/api/v1/auth/google");
      const data = await dataUrl.json();
      console.log(data);
      if (data.result && data.result.urlRedirect) {
        // const code = data.result.urlRedirect.split("?");
        // console.log(code);
        router.push(data.result.urlRedirect);
      } else {
        // Xử lý trường hợp không nhận được URL chuyển hướng
        console.error("URL chuyển hướng không tồn tại");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getGithub = async (e) => {
    e.preventDefault();
    try {
      const dataUrl = await fetch("http://localhost:3001/api/v1/auth/github");
      const data = await dataUrl.json();
      console.log(data);
      if (data.result && data.result.urlRedirect) {
        // const code = data.result.urlRedirect.split("?");
        // console.log(code);
        router.push(data.result.urlRedirect);
      } else {
        // Xử lý trường hợp không nhận được URL chuyển hướng
        console.error("URL chuyển hướng không tồn tại");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="flex justify-center items-center "
      style={{ height: "100vh" }}
    >
      <div className="bg-red-400 text-3xl text-black rounded-xl  p-6">
        <h1 className=" text-center ">Đăng nhập</h1>
        <div className="mt-3 shadow-lg p-4">
          <h2>Đăng nhập bằng mạng xã hội</h2>
          <div className="text-center mt-3 flex flex-col gap-4 ">
            <button onClick={getGoogle} className="hover:text-blue-400">
              Đăng nhập với Google
            </button>
            <button onClick={getGithub} className="hover:text-yellow-400">
              Đăng nhập với Github
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
