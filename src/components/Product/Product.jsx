import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { URL_PRODUCT } from "../../utils/Endpoint";

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Ambil keyword dari URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("search") || "";
    setSearchTerm(keyword);
  }, [location.search]);

  // Ambil produk dari server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(URL_PRODUCT);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);

  // Filter berdasarkan nama produk dan searchTerm
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update URL saat user ketik manual
  const handleInputChange = (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
    navigate(`/product?search=${encodeURIComponent(keyword)}`);
  };

  return (
    <section className="container flex flex-col min-h-screen mx-auto py-6 px-6 md:px-0 overflow-hidden">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full md:w-1/2 p-2 border rounded-xl shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start justify-center py-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const finalPrice =
              product.price - (product.price * (product.discount || 0)) / 100;

            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                onClick={() => navigate(`/detail/${product._id}`)}
                className="bg-white rounded-xl shadow-md flex items-center p-4 gap-4 hover:shadow-lg cursor-pointer"
              >
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex flex-col">
                  <h2 className="text-lg font-poppins">{product.name}</h2>

                  <p className="font-bold">
                    Rp{finalPrice.toLocaleString("id-ID")}
                  </p>

                  {product.discount > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <p className="text-gray-400 line-through">
                        Rp{product.price.toLocaleString("id-ID")}
                      </p>
                      <span className="text-red-500 font-bold">
                        {product.discount}%
                      </span>
                    </div>
                  )}

                  {/* ⭐ Rating bintang */}
                  <div className="flex items-center gap-x-1 text-sm">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-gray-500 font-medium">
                      {product.rating?.toFixed(1) || "0.0"}
                    </span>
                    <p className="text-sm text-gray-500 ml-2">
                      {product.sold || product.sales || 0} Terjual
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <p className="text-gray-600 col-span-3 text-center font-poppins">
            Tidak ada produk ditemukan 😥
          </p>
        )}
      </div>
    </section>
  );
};

export default Product;
