"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/configs/firebase";
import { useState, useRef, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

import Logo from "@/components/Logo/Logo";

export default function Login() {
  // const [email, setEmail] = useState("");
  const email = useRef<any>();
  // const [password, setPassword] = useState("");
  const password = useRef<any>();

  const { push } = useRouter();

  // "khushnud.gdsc@gmail.com"
  // mas123456

  function handleSignIn(e: FormEvent) {
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        user.getIdToken().then((token) => {
          document.cookie = `token=${token};expires=Thu, 01 Jan 2024 00:00:00 UTC; path=/`;
          console.log(token);
          // push("/admin");
          // redirect("/admin");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    console.log(email.current.value, password.current.value);
  }
  return (
    <div className="h-[100vh] bg-[#C30F08] flex items-center justify-center gap-[380px]">
      <div className="scale-150">
        <Logo />
      </div>
      {/* <div>
        <h1>Logo</h1>
      </div> */}
      <div className="bg-[#ffffffde] h-[530px] w-[400px] px-[40px] py-[60px] rounded-[40px]">
        <div>
          <p className="text-center">
            Welcome to{" "}
            <span className="text-lg font-semibold text-[#C30F08]">GIZ</span>
          </p>
        </div>
        <h2 className="mt-[40px] text-center font-light mb-[50px] text-[#444]">
          Sign in
        </h2>
        <form onSubmit={handleSignIn}>
          <div>
            <p className="mb-2 text-sm text-[#444]">Enter your email address</p>
            <input
              type="email"
              placeholder="email"
              className="border w-[100%] h-[50px] px-[10px] mb-2 rounded-[10px] placeholder:text-[#808080]"
              ref={email}
              value="khushnud.gdsc@gmail.com"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-[20px]">
            <p className="mb-2 text-sm text-[#444]">Enter your email address</p>
            <input
              type="password"
              placeholder="password"
              className="border w-[100%] h-[50px] px-[10px] mb-2 rounded-[10px] placeholder:text-[#808080]"
              ref={password}
              value={"mas123456"}
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <button className="border w-[100%] h-[50px] p-2 bg-[#C30F08] text-white rounded-[10px] active:bg-gray-100">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
