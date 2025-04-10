import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-6 px-8 flex flex-row justify-between items-center w-full">
      {/* Teks Hak Cipta */}
      <p className="md:text-lg font-sans">
        © 2025 Penaku Stationery Store. All Rights Reserved.
      </p>

      {/* Ikon Media Sosial */}
      <div className="flex space-x-6">
        <a
          href="https://www.facebook.com/profile.php?id=61572372736164&locale=id_ID"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="text-3xl hover:text-gray-300 transition duration-300" />
        </a>
        <a
          href="https://www.instagram.com/asatustationery/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-3xl hover:text-gray-300 transition duration-300" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
