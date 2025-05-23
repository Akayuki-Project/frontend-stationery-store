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

  const productScrollRef = useRef(null);
  const bannerScrollRef = useRef(null);

  // Drag logic untuk scroll produk
  const isDraggingProduct = useRef(false);
  const startXProduct = useRef(0);
  const scrollLeftProduct = useRef(0);

  // Drag logic untuk scroll banner
  const isDraggingBanner = useRef(false);
  const startXBanner = useRef(0);
  const scrollLeftBanner = useRef(0);

  // Touch logic
  const touchStartX = useRef(0);
  const touchScrollLeft = useRef(0);

  // Fetch product promo
  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const response = await axios.get("https://api-stationery-store.vercel.app/api/products");
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
        const response = await axios.get("https://api-stationery-store.vercel.app/api/banners");
        setBanners(response.data);
      } catch (err) {
        console.error("Gagal ambil data banner:", err);
      }
    };
    fetchBanners();
  }, []);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Scroll logic (produk)
  const handleMouseDownProduct = (e) => {
    isDraggingProduct.current = true;
    productScrollRef.current.classList.add("cursor-grabbing");
    startXProduct.current = e.pageX - productScrollRef.current.offsetLeft;
    scrollLeftProduct.current = productScrollRef.current.scrollLeft;
  };
  const handleMouseMoveProduct = (e) => {
    if (!isDraggingProduct.current) return;
    const x = e.pageX - productScrollRef.current.offsetLeft;
    const walk = (x - startXProduct.current) * 1.5;
    productScrollRef.current.scrollLeft = scrollLeftProduct.current - walk;
  };
  const handleMouseUpProduct = () => {
    isDraggingProduct.current = false;
    productScrollRef.current.classList.remove("cursor-grabbing");
  };

  // Scroll logic (banner)
  const handleMouseDownBanner = (e) => {
    isDraggingBanner.current = true;
    bannerScrollRef.current.classList.add("cursor-grabbing");
    startXBanner.current = e.pageX - bannerScrollRef.current.offsetLeft;
    scrollLeftBanner.current = bannerScrollRef.current.scrollLeft;
  };
  const handleMouseMoveBanner = (e) => {
    if (!isDraggingBanner.current) return;
    const x = e.pageX - bannerScrollRef.current.offsetLeft;
    const walk = (x - startXBanner.current) * 1.5;
    bannerScrollRef.current.scrollLeft = scrollLeftBanner.current - walk;
  };
  const handleMouseUpBanner = () => {
    isDraggingBanner.current = false;
    bannerScrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].pageX;
    touchScrollLeft.current = e.target.scrollLeft;
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX;
    const walk = (x - touchStartX.current) * 1.2;
    e.target.scrollLeft = touchScrollLeft.current - walk;
  };

  return (
    <div id="promo" className="max-w-8xl mx-auto py-32 md:py-24 p-6">
      {/* Banner Section */}
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl font-bold text-gray-700"
        >
          Diskon Promo Spesial ✨
        </motion.h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(bannerScrollRef, "left")}
            className="p-3 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scroll(bannerScrollRef, "right")}
            className="p-3 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div
          ref={bannerScrollRef}
          className="flex gap-6 transition-all duration-500 cursor-grab select-none scrollbar-hide p-2 overflow-x-auto scroll-smooth"
          onMouseDown={handleMouseDownBanner}
          onMouseMove={handleMouseMoveBanner}
          onMouseUp={handleMouseUpBanner}
          onMouseLeave={handleMouseUpBanner}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {banners
            .slice()
            .reverse()
            .map((banner, index) => (
              <motion.div
                key={index}
                className="min-w-[90%] md:min-w-[45%] bg-teal-300 p-8 rounded-lg flex items-center justify-between"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: index * 0.1 }}
              >
                <div>
                  <h2 className="text-3xl font-bold text-yellow-400">
                    DISKON <span>{banner.discount}%</span>
                  </h2>
                  <p className="text-white text-md font-semibold">
                    {banner.description1}
                  </p>
                  <p className="text-secondary text-sm font-poppins font-semibold">
                    {banner.description2}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.05 }}
                    onClick={() => navigate(`/product`)}
                    className="mt-4 bg-secondary text-white px-4 py-2 rounded-full shadow-md text-sm font-semibold"
                  >
                    CEK SEKARANG ➜
                  </motion.button>
                </div>
                <img src={banner.thumbnail} alt="Diskon" className="w-32" />
              </motion.div>
            ))}
        </div>
      </div>

      {/* Produk Section */}
      <div className="flex items-center justify-between mt-16 mb-4">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl font-bold text-gray-700"
        >
          Produk Promo Spesial ✨
        </motion.h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(productScrollRef, "left")}
            className="p-3 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scroll(productScrollRef, "right")}
            className="p-3 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div
          ref={productScrollRef}
          className="flex gap-6 transition-all duration-500 cursor-grab select-none scrollbar-hide p-2"
          style={{ scrollBehavior: "smooth", overflowX: "auto" }}
          onMouseDown={handleMouseDownProduct}
          onMouseMove={handleMouseMoveProduct}
          onMouseUp={handleMouseUpProduct}
          onMouseLeave={handleMouseUpProduct}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {promoList
            .slice()
            .reverse()
            .map((promo, index) => {
              const finalPrice =
                promo.price - (promo.price * (promo.discount || 0)) / 100;

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
