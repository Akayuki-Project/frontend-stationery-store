import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FadeLeft } from "../../utility/animation";
import diskonPng from "../../assets/diskon/diskon1.png";
import promo1 from "../../assets/promo/promo1.png";
import promo2 from "../../assets/promo/promo2.png";
import promo3 from "../../assets/promo/promo3.png";

  const PromoData = [
    {
      id: 1,
      image: promo1,
      name: "DAILY GO - Tas Ransel Tahan Air",
      price: "Rp37.400",
      oldPrice: "Rp42.000",
      discount: "-11%",
      link: "/",
      delay: 0.1,
    },
    {
      id: 2,
      image: promo2,
      name: "Noteria - Notebook",
      price: "Rp14.500",
      oldPrice: "Rp15.500",
      discount: "-5%",
      link: "/",
      delay: 0.2,
    },
    {
      id: 3,
      image: promo3,
      name: "PalettePencil - Superior Quality Pencils Color",
      price: "Rp32.300",
      oldPrice: "Rp34.000",
      discount: "-5%",
      link: "/",
      delay: 0.3,
    },
    {
      id: 4,
      image: promo3,
      name: "PalettePencil - Superior Quality Pencils Color",
      price: "Rp32.300",
      oldPrice: "Rp34.000",
      discount: "-5%",
      link: "/",
      delay: 0.4,
    },
    {
      id: 5,
      image: promo3,
      name: "PalettePencil - Superior Quality Pencils Color",
      price: "Rp32.300",
      oldPrice: "Rp34.000",
      discount: "-5%",
      link: "/",
      delay: 0.5,
    },
    {
      id: 6,
      image: promo3,
      name: "PalettePencil - Superior Quality Pencils Color",
      price: "Rp32.300",
      oldPrice: "Rp34.000",
      discount: "-5%",
      link: "/",
      delay: 0.6,
    },
  ];

const Promo = () => {
  const navigate = useNavigate();
  return (
    <div id="promo" className="max-w-8xl mx-auto py-20 p-6">
      {/* Diskon */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[1, 2].map((diskon) => (
          <div key={diskon} className="bg-teal-300 p-8 rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-yellow-500">
                DISKON <span className="text-yellow-500">40%</span>
              </h2>
              <p className="text-white text-lg font-semibold">Untuk semua alat tulis</p>
              <p className="text-secondary text-md font-poppins font-semibold">Lengkapi kebutuhan belajarmu</p>
              <motion.button 
              initial="hidden"
              animate={"visible"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.1 }}
              onClick={() => navigate(`/product`)}
              className="mt-4 bg-secondary text-white px-5 py-3 rounded-full shadow-md text-lg font-semibold">
                CEK SEKARANG ➜
              </motion.button>
            </div>
            <img src={diskonPng} alt="Diskon" className="w-40" />
          </div>
        ))}
      </motion.div>

      {/* Promo */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
      >
        {PromoData.map((promo) => (
          <motion.div
            key={promo.id}
            variants={FadeLeft(promo.delay)}
            initial="hidden"
            animate={"visible"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
            onClick={() => navigate(`/detail/${promo.id}`)}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <img src={promo.image} alt={promo.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-md font-semibold mt-3">{promo.name}</h3>
            <p className="text-red-400 font-bold text-lg">{promo.price}</p>
            <p className="text-gray-500 text-sm line-through">{promo.oldPrice}</p>
            <span className="bg-red-400 text-white text-sm px-3 py-1 rounded-full">{promo.discount}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Promo;
