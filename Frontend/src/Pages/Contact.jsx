import React from 'react'
import { assets } from '../assets/assets'
import Title from '../Componets/Title'
import NewsLetter from '../Componets/NewsLetter'


const Contact = () => {
  return (
    <div className='border-t pt-10'>

      {/* Heading */}
      <div className="text-center text-2xl">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Store Section */}
      <div className="my-10 flex flex-col md:flex-row justify-center gap-10 mb-20 px-6">

        {/* Image */}
        <img 
          src={assets.contact_img} 
          className='w-full md:max-w-[480px] rounded-lg shadow-md' 
          alt="Store"
        />

        {/* Store Details */}
        <div className="flex flex-col justify-center items-start gap-6 text-gray-600">

          <p className='font-semibold text-xl text-gray-800'>
            Our Bhopal Store
          </p>

          <p>
            DB Mall, Zone-II <br />
            MP Nagar <br />
            Bhopal, Madhya Pradesh 462011
          </p>

          <p>
            📞 Phone: +91 98765 43210 <br />

            📧 Email: support@trendify.com
          </p>

          <div>
            <p className='font-semibold text-gray-800'>
              Store Hours
              
            </p>
            <p>
              Monday – Sunday: 10:00 AM – 9:30 PM
            </p>
          </div>

          <a 
            href="https://www.google.com/maps/place/DB+Mall+Bhopal/"
            target="_blank"
            rel="noopener noreferrer"
            className='bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition-all'
          >
            OPEN IN GOOGLE MAPS
          </a>

        </div>
      </div>

      
     
      <div className="w-full px-6 pb-20 mt-16">
        <iframe
          title="DB Mall Bhopal Location"
          src="https://www.google.com/maps?q=DB+Mall+Zone+2+MP+Nagar+Bhopal&output=embed"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          className="rounded-lg shadow-md"
        ></iframe>
      </div>

<div className="mt-20
">

</div>
<NewsLetter/>

    </div>
  )
}

export default Contact