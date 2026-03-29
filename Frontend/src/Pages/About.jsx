import React, { useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import Title from '../Componets/Title'
import NewsLetter from '../Componets/NewsLetter'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {

  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    const img = section.querySelector(".about-img");
    const text = section.querySelector(".about-text");
    const cards = section.querySelectorAll(".about-card");

    // Image animation
    gsap.from(img, {
      x: -80,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: img,
        start: "top 90%",
        toggleActions: "play none none reset",
      },
    });

    // Text animation
    gsap.from(text, {
      x: 80,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: text,
        start: "top 90%",
        toggleActions: "play none none reset",
      },
    });

    // Cards animation
     cards.forEach((card) => {
    gsap.from(card, {
      y: 80,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,  
        start: "top 90%",
        toggleActions: "play none none reset",
      },
    });
  })

    ScrollTrigger.refresh();
  }, []);

  return (
    <div ref={sectionRef}>

      {/* Heading */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* About Section */}
      <div className="my-10 flex flex-col md:flex-row gap-16">

        <img 
          className='about-img w-full md:max-w-[450px] rounded-lg shadow-md'
          src={assets.about_img} 
          alt="about"
        />

        <div className="about-text flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">

          <p>
            At Trift, we believe fashion is more than just clothing — it's a statement of confidence, individuality, and lifestyle. Our mission is to bring you the latest trends with premium quality, without compromising on comfort and affordability.
          </p>

          <p>
            We carefully curate every collection to match modern fashion needs, combining style, elegance, and everyday usability. Whether you're looking for casual wear or standout pieces, Trift ensures you always step out in style.
          </p>

          <b className='text-gray-800'>Our Mission</b>

          <p>
            Our mission is to redefine online fashion shopping by delivering high-quality products, seamless user experience, and exceptional customer satisfaction. We aim to make fashion accessible, trendy, and trustworthy for everyone.
          </p>

        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="text-4xl py-4 text-center">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">

        <div className="about-card border px-10 md:px-16 py-10 flex flex-col gap-5 hover:shadow-lg transition">
          <b className="text-lg">Premium Quality</b>
          <p className='text-gray-600'>
            Every product is crafted with attention to detail using high-quality materials to ensure durability and comfort.
          </p>
        </div>

        <div className="about-card border px-10 md:px-16 py-10 flex flex-col gap-5 hover:shadow-lg transition">
          <b className="text-lg">Latest Trends</b>
          <p className='text-gray-600'>
            Stay ahead in fashion with our constantly updated collections inspired by global trends.
          </p>
        </div>

        <div className="about-card border px-10 md:px-16 py-10 flex flex-col gap-5 hover:shadow-lg transition">
          <b className="text-lg">Customer First</b>
          <p className='text-gray-600'>
            We prioritize your satisfaction with easy returns, fast delivery, and dedicated support.
          </p>
        </div>

      </div>

      {/* Newsletter */}
      <NewsLetter />
    </div>
  )
}

export default About;