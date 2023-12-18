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
    <div className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition">
      <div className="bg-white rounded-full p-1">
        <Image src="/logo.svg" alt="Twitch-MG" width={32} height={32} />
      </div>
      <div className={cn(font.className)}>
        <p className="text-lx font-semibold">Twitch MG</p>
        <p className="text-xs text-muted-foreground">Let's Play!</p>
      </div>
    </div>
   </Link>
  )
}

export default Logo;
