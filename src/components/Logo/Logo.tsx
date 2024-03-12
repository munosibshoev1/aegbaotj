"use client";

import Image from "next/image";
import Link from "next/link";

import LogoImage from "../../../public/images/logo.png";

import { usePathname } from "next/navigation";

export default function Logo() {
  const path = usePathname();
  return (
    <>
      {path == "/" ? (
        <a href="#header">
          <Image className="logo" src={LogoImage} alt="Logo" width={200} height={200} />
        </a>
      ) : (
        <Link href={path == "/" ? "#header" : "/"}>
          <Image className="logo" src={LogoImage} alt="Logo" width={200} height={200} />
        </Link>
      )}
    </>
  );
}
