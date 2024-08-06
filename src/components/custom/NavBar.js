import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  return (
    <div className="flex justify-around items-center p-1">
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
      <ul className="list-none flex items-center gap-3">
        <li className="hover:bg-slate-400 hover:text-white p-2 rounded-md">
          <Link href="#">Home</Link>
        </li>
        <li className="hover:bg-slate-400 hover:text-white p-2 rounded-md">
          <Link href="#">Services</Link>
        </li>
        <li className="hover:bg-slate-400 hover:text-white p-2 rounded-md">
          <Link href="#">About</Link>
        </li>
        <li className="hover:bg-slate-400 hover:text-white p-2 rounded-md">
          <Link href="#">Contact</Link>
        </li>
      </ul>
      <Link href="/auth/signin">
        <Button>SignIn</Button>
      </Link>
    </div>
  );
}
