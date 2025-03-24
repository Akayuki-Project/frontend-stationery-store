import React from 'react';
import { IoBagHandleOutline } from 'react-icons/io5';
import HeroPng from '../../assets/hero.png';
import BookPng from '../../assets/book.png';
import { motion } from 'framer-motion';
import { FadeRight } from '../../utility/animation';

const Hero = () => {
  return (
    <section className="bg-secondary text-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
        {/* Brand Info */}
        <div className="flex flex-col justify-center py-14 md:py-0 relative z-10">
            <div className="text-center md:text-left space-y-6 lg:max-w-[450px]">
                <motion.h1
                variants={FadeRight(0.6)}
                initial="hidden"
                animate="visible"
                className="text-3xl lg:text-4xl leading-relaxed xl:leading-loose font-light"
                >
                  P E N A K U
                </motion.h1>
                <motion.h1
                variants={FadeRight(0.6)}
                initial="hidden"
                animate="visible"
                className="text-5xl lg:text-6xl leading-relaxed xl:leading-loose font-serif font-semibold"
                >
                  Stationery Store
                </motion.h1>
                <motion.p 
                variants={FadeRight(1.2)}
                initial="hidden"
                animate="visible"
                className="text-white text-lg lg:text-xl font-poppins"
                >
                  Belajar, bekerja, atau berkarya—semua lebih seru dengan perlengkapan yang tepat!
                  <br />
                  💡 Harga terbaik, pilihan lengkap, dan kualitas terjamin.
                </motion.p>
                {/* button section */}
                <motion.div 
                variants={FadeRight(1.5)}
                initial="hidden"
                animate="visible"
                className="flex justify-center md:justify-start"
                >
                  <button className="primary-btn flex items-center gap-2">
                    <span>
                      <IoBagHandleOutline />
                    </span>
                    Order Now</button>
                </motion.div>
            </div>
        </div>
        {/* Hero Images */}
        <div className="flex justify-center items-center">
          <motion.img 
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          src={HeroPng} 
          alt="" 
          className="w-[350px] md:w-[550px] drop-shadow"
          />
        </div>
        {/* Book Images */}
        <div className="absolute top-14 md:top-0 right-1/2 blur-sm opacity-80 rotate-[40deg]">
          <motion.img 
          initial={{ opacity: 0, y: -200, rotate: 75 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          src={BookPng} 
          alt="" 
          className="w-full md:max-w-[300px]"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
