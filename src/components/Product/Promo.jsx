import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FadeLeft } from "../../utility/animation";
import axios from "axios";
import {
  FaStar,
  FaShoppingCart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Promo = () => {
  const navigate = useNavigate();
  const [promoList, setPromoList] = useState([]);
  const [banners, setBanners] = useState([]);
  const scrollRef = useRef(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const touchStartX = useRef(0);
  const touchScrollLeft = useRef(0);

  // Fetch product promo
  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        setPromoList(response.data);
      } catch (err) {
        console.error("Gagal ambil data promo:", err);
      }
    };
    fetchPromo();
  }, []);

  // Fetch banners from backend
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/banners");
        setBanners(response.data);
      } catch (err) {
        console.error("Gagal ambil data banner:", err);
      }
    };
    fetchBanners();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    scrollRef.current.classList.add("cursor-grabbing");
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].pageX;
    touchScrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX;
    const walk = (x - touchStartX.current) * 1.2;
    scrollRef.current.scrollLeft = touchScrollLeft.current - walk;
  };

  return (
    <div id="promo" className="max-w-8xl mx-auto py-24 p-6">
      <motion.h2 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="text-xl font-bold text-gray-700 mb-8"
      >
        Diskon Promo Spesial ✨
      </motion.h2>

      {/* Banner Dinamis dari Admin */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
      >
        {banners.slice().reverse().map((banner, index) => (
          <div
            key={index}
            className="bg-teal-300 p-8 rounded-lg flex items-center justify-between"
          >
            <div>
              <h2 className="text-4xl font-bold text-yellow-400">
                DISKON <span className="text-yellow-400">{banner.discount}%</span>
              </h2>
              <p className="text-white text-lg font-semibold">{banner.description1}</p>
              <p className="text-secondary text-md font-poppins font-semibold">
                {banner.description2}
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
                onClick={() => navigate(`/product`)}
                className="mt-4 bg-secondary text-white px-5 py-3 rounded-full shadow-md text-lg font-semibold"
              >
                CEK SEKARANG ➜
              </motion.button>
            </div>
            <img src={banner.thumbnail} alt="Diskon" className="w-40" />
          </div>
        ))}
      </motion.div>

      {/* Kontrol Slider Produk */}
      <div className="flex items-center justify-between mb-4">
        <motion.h2 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl font-bold text-gray-700"
        >
          Produk Promo Spesial ✨
        </motion.h2>
        <div className="flex gap-2">
          <button onClick={() => scroll("left")} className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaChevronLeft />
          </button>
          <button onClick={() => scroll("right")} className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Produk Promo Slider */}
      <div className="overflow-x-auto scrollbar-hide">
        <div
          ref={scrollRef}
          className="flex gap-6 transition-all duration-500 cursor-grab select-none scrollbar-hide p-2"
          style={{ scrollBehavior: "smooth", overflowX: "auto" }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {promoList.slice().reverse().map((promo, index) => {
            const finalPrice = promo.price - (promo.price * (promo.discount || 0)) / 100;

            return (
              <motion.div
                key={`${promo._id}-${index}`}
                variants={FadeLeft(index * 0.1)}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.05 }}
                onClick={() => navigate(`/detail/${promo._id}`)}
                className="min-w-[200px] bg-white p-4 rounded-lg shadow-md text-center cursor-pointer"
              >
                <img
                  src={promo.thumbnail}
                  alt={promo.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-md font-poppins mt-3">{promo.name}</h3>
                <p className="font-bold">
                  Rp{finalPrice.toLocaleString("id-ID")}
                </p>
                {promo.discount > 0 && (
                  <div className="text-sm flex justify-center gap-2">
                    <p className="text-gray-400 line-through">
                      Rp{promo.price.toLocaleString("id-ID")}
                    </p>
                    <span className="text-red-500 font-bold">
                      {promo.discount}%
                    </span>
                  </div>
                )}
                <div className="flex justify-center items-center gap-3 text-sm mt-3">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <FaStar />
                    <span>{promo.rating?.toFixed(1) || "0.0"}</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-500">
                    <FaShoppingCart />
                    <span>{promo.sold || promo.sales || 0} terjual</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Promo;
