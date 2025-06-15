import Link from "next/link";
import { NavLink } from "./layout";

export function Sidebar({ links }: { links: NavLink[] }) {
  return (
    <nav>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
