import HomeNav from '@/components/HomeNav'
import { Button } from '@/components/ui/button';
import { ArrowBigRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {

  return (
    <div>
      <HomeNav/>
      <div className="flex justify-center items-center text-center flex-col gap-5 md:my-20 my-10 mx-auto xl:w-[40%] lg:w-[60%] md:w-[70%] w-[90%]">
        <div className="my-5">
          <h1 className="lg:text-5xl md:text-3xl text-2xl font-bold text-black">AI Content {" "} 
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600'>Generator</span></h1>
          </div>
        <div className="text-slate-700">
            <p className='text-md font-semibold'>
              Revolutionize your content creation with our Ai-powered app, 
              delivering engaging and high-quality text in seconds.
            </p>
        </div>
        <div className="">
          <Link href={'/dashboard'}>
           <Button className='bg-gradient-to-r from-purple-600 to-blue-600'>Get Started <ArrowBigRight/></Button>

          </Link>
        </div>
        
      </div>
    </div>
  );
}
