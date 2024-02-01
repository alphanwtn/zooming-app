import Link from "next/link";
import React from "react";

export function Header() {
  return (
    <header>
      <Link href={"/"}>
        <h1>🔍 - The Zooming App</h1>
      </Link>
    </header>
  );
}
