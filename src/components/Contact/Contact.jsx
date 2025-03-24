import React from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="bg-primary text-white py-20 px-8">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text & Icons */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl text-center lg:text-left"
        >
          <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
          <p className="text-lg mb-8">
            Terima kasih telah mengunjungi toko kami! Jika Anda memiliki
            pertanyaan, butuh rekomendasi alat tulis, atau ingin melakukan
            pemesanan dalam jumlah besar, jangan ragu untuk menghubungi kami.
            Kami siap membantu!
          </p>
          <div className="flex flex-col gap-5 items-center lg:items-start">
            <div className="flex items-center gap-4">
              <FaPhone className="text-5xl bg-white text-gray-500 p-3 rounded-full shadow-md" />
              <span className="text-xl">+62 816 4699 2935</span>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-5xl bg-white text-gray-500 p-3 rounded-full shadow-md" />
              <span className="text-xl">aditk12350@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FaInstagram className="text-5xl bg-white text-gray-500 p-3 rounded-full shadow-md" />
              <span className="text-xl">@akayukikobayashi</span>
            </div>
          </div>
        </motion.div>

        {/* Formulir Contact */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-teal-800 p-8 rounded-xl shadow-lg w-full max-w-lg"
        >
          <h3 className="text-2xl font-semibold mb-6">Send Message</h3>
          <form className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Full Name"
              className="p-4 text-lg rounded-lg bg-white text-gray-800 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-4 text-lg rounded-lg bg-white text-gray-800 focus:outline-none"
            />
            <textarea
              placeholder="Type your Message"
              rows="5"
              className="p-4 text-lg rounded-lg bg-white text-gray-800 focus:outline-none"
            />
            <button className="bg-secondary hover:bg-green-600 text-white py-3 text-lg rounded-lg font-semibold">
              Send
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
