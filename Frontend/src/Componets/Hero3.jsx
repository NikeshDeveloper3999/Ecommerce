
import React, { useRef , useEffect} from "react";
import { gsap } from "gsap";


import {assets } from '../assets/assets'
const Hero3 = () => {


  const HeroRef = useRef(null);

useEffect(() => {
  gsap.from(HeroRef.current, {
    x: -80,
    opacity: 0,
    delay:0.5,
    duration:1,
  });

}, []);



  return (

<div className=" flex flex-col  sm:flex-row border border-gray-400">

<div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'> 
<div className='text-[#414141]'>
<div className='flex items-center gap-2'>
<p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
<p className='font-meidum text-sm md:text-base ' > OUR BESTSELLERS</p>
</div>
<h1 className='prata-regular text-5xl sm:py-3 lg-text-5xl leading-relaxed ' ref={HeroRef} >Latest Arrivals </h1>
<div className='flex items-center gap-2'>
  <p className='font-semibold  text-sm md:text-base'>SHOP NOW </p>
  <p className='w-8 md:w-11 h-[1px] bg-[#414141]'> </p>
   </div>
</div>
</div>


{/*  hero right side  */ }

<img src={assets.hero_img} alt=""  className='w-full sm:w-1/2'/>
 
      </div>
  )
}

export default Hero3

