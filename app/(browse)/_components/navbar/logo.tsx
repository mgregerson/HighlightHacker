import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

function Logo() {
  return (
   <Link href="/">
    <div className="flex items-center gap-x-4 hover:opacity-75 transition">
      <div className="bg-white rounded-full p-1 mr-10 shrink-0 lg:mr-0 lg:shrink">
        <Image src="/logo.svg" alt="highlight-hacker" width={32} height={32} />
      </div>
      <div className={cn(
        "hidden lg:block",
        font.className)}>
        <p className="text-lx font-semibold">Highlight Hacker</p>
        <p className="text-xs text-muted-foreground">Let&apos;s Play!</p>
      </div>
    </div>
   </Link>
  )
}

export default Logo;
