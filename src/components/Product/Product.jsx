import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Product1 from "../../assets/products/product1.png";
import Product2 from "../../assets/products/product2.png";
import Product3 from "../../assets/products/product3.png";
import Product4 from "../../assets/products/product4.png";
import Product5 from "../../assets/products/product5.png";
import Product6 from "../../assets/products/product6.png";
import Product7 from "../../assets/products/product7.png";
import Product8 from "../../assets/products/product8.png";
import Product9 from "../../assets/products/product9.png";
import Product10 from "../../assets/products/product10.png";

const ProductData = [
  {
    id: 1,
    title: "Tip-Ex Karakter Sumikko Gurashi",
    price: "Rp28.000",
    originalPrice: "Rp35.000",
    rating: 4.9,
    reviews: "14RB Penilaian",
    img: Product1,
  },
  {
    id: 2,
    title: "Koreksi Tape Mini Kamera Pastel",
    price: "Rp28.000",
    originalPrice: "Rp35.000",
    rating: 4.9,
    reviews: "14RB Penilaian",
    img: Product6,
  },
  {
    id: 3,
    title: "Pulpen Kawaii Karakter",
    price: "Rp28.000",
    originalPrice: "Rp35.000",
    rating: 4.9,
    reviews: "14RB Penilaian",
    img: Product2,
  },
  {
    id: 4,
    title: "Elmer’s Glue-All - Lem Cair untuk Kerajinan & DIY",
    price: "Rp28.000",
    originalPrice: "Rp35.000",
    rating: 4.9,
    reviews: "14RB Penilaian",
    img: Product7,
  },
  {
    id: 5,
    title: "Kotak Pensil Simple & Stylish - Grid Edition",
    price: "Rp28.000",
    originalPrice: "Rp35.000",
    rating: 4.9,
    reviews: "14RB Penilaian",
    img: Product3,
  },
  {
    id: 6,
    title: "Stapler Mini Lucu Deli - Warna Pastel",
    price: "Rp28.000",
    originalPrice: "Rp35.000",
    rating: 4.9,
    reviews: "14RB Penilaian",
    img: Product8,
  },
  {
    id: 7,
    title: "Kotak Pensil Simple & Stylish - Grid Edition",
    price: "Rp28.000",
    originalPrice: "Rp35.000",
    rating: 4.9,
    reviews: "14RB Penilaian",
    img: Product4,
  },
  {
    id: 8,
    title: "Desk Organizer Pink - Penyimpanan Alat Tulis Minimalis",
    price: "Rp28.000",
    originalPrice: "Rp35.000",
    rating: 4.9,
    reviews: "14RB Penilaian",
    img: Product9,
  },
  {
    id: 9,
    title: "Kotak Pensil Simple & Stylish - Grid Edition",
    price: "Rp28.000",
    originalPrice: "Rp35.000",
    rating: 4.9,
    reviews: "14RB Penilaian",
    img: Product5,
  },
  {
    id: 10,
    title: "Clipboard Kawaii Pet Bear - Alas Tulis Lucu",
    price: "Rp28.000",
    originalPrice: "Rp35.000",
    rating: 4.9,
    reviews: "14RB Penilaian",
    img: Product10,
  },
];

const Product = () => {
  return (
    <section id="/product" className="container mx-auto py-12 px-6 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 min-h-screen items-center justify-center py-20 lg:py-20">
        {ProductData.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md flex items-center p-4 gap-4 hover:shadow-lg"
          >
            {/* Images Product */}
            <img
              src={product.img}
              alt={product.title}
              className="w-32 h-32 object-cover rounded-lg"
            />
            {/* Detail Product */}
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <div className="flex items-center gap-1 text-yellow-500 text-sm">
                ⭐ {product.rating} • {product.reviews}
              </div>
              <p className="text-red-500 font-semibold">{product.price}</p>
              <p className="text-gray-400 line-through text-sm">
                {product.originalPrice}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Product;
