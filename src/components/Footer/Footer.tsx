import Link from "next/link";
import Logo from "../Logo/Logo";
import "./Footer.css"

export default function Footer() {
  return (
    <footer id="footer" className="flex items-start justify-between gap-14 flex-wrap px-28 py-[75px] bg-[#C30F08]">
      <div>
        <Logo />
        <p className="text-white block mt-4">
          © 2023 GIZ. All rights reserved.
        </p>
      </div>
      {/* <nav>
        <ul className="flex flex-col justify-start items-start gap-3">
          <li>
            <Link className="text-white text-xl font-bold" href={"/login"}>
              About
            </Link>
          </li>
          <li>
            <Link className="text-white text-xl font-bold" href={"/admin"}>
              Projects
            </Link>
          </li>
        </ul>
      </nav> */}
      <div>
        <h3 className="text-white font-bold">Contacts</h3>
        <p className="text-white">giz-tadschikistan@giz.de</p>
        <p className="text-white mt-1">+992 (44) 600 61 07</p>
      </div>
    </footer>
  );
}
