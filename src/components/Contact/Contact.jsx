import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from 'emailjs-com';
import { FaPaperPlane, FaCheck, FaPhone, FaEnvelope, FaLocationDot } from "react-icons/fa6";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = (e) => {
    e.preventDefault();
    setIsSending(true);

    const serviceID = 'service_tz6ngs6';      // Ganti dengan service ID dari EmailJS
    const templateID = 'template_fgo3bqe';    // Ganti dengan template ID dari EmailJS
    const publicKey = 'iYDE40Bv-7RKLLP3o';    // Ganti dengan public key dari EmailJS

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then(() => {
        setIsSending(false);
        setIsSent(true);
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => setIsSent(false), 2000);
      })
      .catch((error) => {
        setIsSending(false);
        alert("Gagal mengirim pesan 😭");
        console.error("EmailJS Error:", error);
      });
  };

  return (
    <section className="bg-secondary text-white py-40 px-6 overflow-hidden">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Text & Icons */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl text-center lg:text-left"
        >
          <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
          <p className="text-lg mb-8">
            Terima kasih telah mengunjungi toko kami! Jika Anda memiliki
            pertanyaan, jangan ragu untuk menghubungi kami.
          </p>
          <div className="flex flex-wrap lg:flex-col gap-5 items-center lg:items-start justify-center lg:justify-center">
            <a href="tel:+6281646992935" className="flex items-center gap-3 text-center">
              <FaPhone className="text-5xl bg-white text-gray-500 p-3 rounded-full shadow-md hover:text-primary transition" />
              <span className="hidden lg:block text-xl">+62 816 4699 2935</span>
            </a>
            <a href="mailto:stationery@gmail.com" className="flex items-center gap-3 text-center">
              <FaEnvelope className="text-5xl bg-white text-gray-500 p-3 rounded-full shadow-md hover:text-primary transition" />
              <span className="hidden lg:block text-xl">stationery@gmail.com</span>
            </a>
            <a href="https://maps.google.com/?q=Pageruyung" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-center">
              <FaLocationDot className="text-5xl bg-white text-gray-500 p-3 rounded-full shadow-md hover:text-primary transition" />
              <span className="hidden lg:block text-xl">Pageruyung</span>
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-teal-800 p-8 rounded-xl shadow-lg w-full max-w-[320px] lg:max-w-lg relative"
        >
          <h3 className="text-2xl font-semibold mb-6">Send Message</h3>
          <form className="flex flex-col gap-5" onSubmit={handleSend}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="p-4 text-lg rounded-lg bg-white text-gray-800 focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-4 text-lg rounded-lg bg-white text-gray-800 focus:outline-none"
              required
            />
            <textarea
              name="message"
              placeholder="Type your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="p-4 text-lg rounded-lg bg-white text-gray-800 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white py-3 text-lg rounded-lg font-semibold relative overflow-hidden flex justify-center items-center"
            >
              {/* Plane animation */}
              {isSending && (
                <motion.span
                  initial={{ x: "-1000%" }}
                  animate={{ x: "1000%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="left-0 right-0 mx-auto text-white text-2xl"
                >
                  <FaPaperPlane />
                </motion.span>
              )}

              {/* Checkmark animation */}
              {isSent && (
                <motion.span
                  initial={{ scale: 2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="left-0 right-0 mx-auto text-white text-2xl"
                >
                  <FaCheck />
                </motion.span>
              )}

              {/* Default Text */}
              {!isSending && !isSent && "Send"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
