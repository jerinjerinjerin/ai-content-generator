import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HomeNav = () => {

  return (
    <div className="py-5 text-black h-[100px] flex justify-between items-center md:px-[50px] px-[20px] shadow-md">
      <div className="">
        <Image
          src="/logo.svg"
          alt="AI Content Creator"
          width={120}
          height={120}
        />
      </div>
      <div className="flex items-center gap-3">
        <User/>
        <Link href={'/dashboard'}>
        <Button variant={'outline'}>Get Started</Button>
        </Link>
      </div>
    </div>
  );
}

export default HomeNav;
