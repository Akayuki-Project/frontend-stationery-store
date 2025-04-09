import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AboutPng1 from "../../assets/about/about1.png";
import AboutPng2 from "../../assets/about/about1.png";
import AboutPng3 from "../../assets/about/about1.png";

const images = [AboutPng1, AboutPng2, AboutPng3];

const About = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [index]);

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <section className="bg-secondary text-white py-40 px-6 overflow-hidden">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl text-center lg:text-left"
        >
          <h2 className="text-4xl font-bold mb-6">About Us</h2>
          <p className="text-lg mb-6">
            Hai! Kami dari{" "}
            <span className="font-semibold">Stationery Store</span>, toko alat
            tulis yang siap menemani aktivitas menulis dan menggambar Anda. Dari
            keperluan sekolah, kerja, hingga hobi, kami punya koleksi lengkap
            untuk memenuhi kebutuhan Anda.
          </p>
          <p className="text-lg mb-6">
            Kami ingin membuat belanja alat tulis jadi lebih mudah, menyenangkan,
            dan tentunya hemat! Terima kasih sudah mempercayakan kebutuhan alat
            tulis Anda kepada kami. 😊
          </p>
          <p className="text-lg flex items-center gap-3">
            📍 Yuk, cek koleksi kami dan temukan alat tulis favoritmu!
          </p>
        </motion.div>

        {/* Image Slider */}
        <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative flex flex-col items-center justify-center w-full max-w-[320px] lg:max-w-lg">
          {/* Tombol Navigasi Kiri */}
          <button
            className="absolute left-[-50px] bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition"
            onClick={prevSlide}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Gambar Slider dengan efek geser */}
          <div className="overflow-hidden w-full rounded-xl shadow-lg">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {images.map((img, i) => (
                <img key={i} src={img} alt="About" className="w-full flex-shrink-0" />
              ))}
            </div>
          </div>

          {/* Tombol Navigasi Kanan */}
          <button
            className="absolute right-[-50px] bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition"
            onClick={nextSlide}
          >
            <ChevronRight size={24} />
          </button>

          {/* Indikator Slide */}
          <div className="flex gap-2 mt-4">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === index ? "bg-white" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
