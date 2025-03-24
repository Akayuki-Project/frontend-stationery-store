import React from "react";
import { motion } from "framer-motion";
import AboutPng from "../../assets/about.png";

const About = () => {
  return (
    <section className="bg-secondary text-white py-20 px-8">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
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

        {/* Images */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-md"
        >
          <img
            src={AboutPng}
            alt="About"
            className="rounded-xl shadow-lg w-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
