import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ContactIcon,
  LayoutDashboardIcon,
  LogInIcon,
  MenuIcon,
} from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const navList = [
    {
      path: "/dashboard",
      label: "Dashboard",
    },
    {
      path: "/contact-us",
      label: "Contact Us",
    },
  ];

  return (
    <header className="bg-background sticky top-0 border-b">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="text-primary block" href="/">
              <span className="sr-only">Home</span>
              <h3>SyncoHR</h3>
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                {navList.map((item) => (
                  <li key={item.label}>
                    <Link href={item.path} className="hover:text-gray-600">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex sm:gap-4">
              <SignedOut>
                <SignInButton>
                  <Button>Sign In</Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>

            <div className="block md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MenuIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    {" "}
                    <LayoutDashboardIcon /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {" "}
                    <ContactIcon /> Contact
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="bg-primary text-primary-foreground">
                    <LogInIcon className="text-primary-foreground" /> Login
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
