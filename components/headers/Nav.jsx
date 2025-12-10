"use client";

import { blogMenu, homes, otherPages, propertyLinks } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Nav() {
  const pathname = usePathname();

  const isParentActive = (menus) =>
    menus.some((menu) =>
      menu.submenu
        ? menu.submenu.some((item) =>
            item.submenu
              ? item.submenu.some(
                  (item) => item.href.split("/")[1] === pathname.split("/")[1]
                )
              : item.href.split("/")[1] === pathname.split("/")[1]
          )
        : menu.href.split("/")[1] === pathname.split("/")[1]
    );

  return (
    <>
      <li
        className=""
      >
        <a href="/">Home</a>
      </li>

      <li
        className=""
      >
        <a href="/properties-grid">Hoardings</a>
      </li>

      <li
        className=""
      >
        <a href="/locations-grid">Locations</a>
      </li>

      <li className={"/contact" == pathname ? "current-menu" : ""}>
        <Link href={`/contact`}>Contact</Link>
      </li>
    </>
  );
}
