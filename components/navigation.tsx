"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
          {path === "/" ? "⚽" : ""}
        </li>
        <li>
          <Link href="/about-us">About Us</Link>
          {path === "/about-us" ? "⚽" : ""}
        </li>
        <li>
          <Link href="/about-us/company/jobs/sales">Sales</Link>
          {path === "/about-us/company/jobs/sales" ? "⚽" : ""}
        </li>
      </ul>
    </nav>
  );
}
