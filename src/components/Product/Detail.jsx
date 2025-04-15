import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL_PRODUCT } from "../../utils/Endpoint";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useNavigate } from "react-router-dom";

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${URL_PRODUCT}/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };

    fetchProduct();

    const savedRating = localStorage.getItem(`rated_${id}`);
    if (savedRating) {
      setUserRating(parseInt(savedRating));
    }
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(value < 1 ? 1 : value);
  };

  // Di bagian handleBuy ganti jadi:
  const handleBuy = () => {
    navigate(`/checkout/${id}`, {
      state: { quantity }, // kirim kuantitas ke checkout
    });
  };

  const handleRating = async (ratingValue) => {
    const prevRating = parseInt(localStorage.getItem(`rated_${id}`)) || 0;
  
    try {
      let updatedTotalRating = (product.totalRating || 0);
      let updatedRatingCount = (product.ratingCount || 0);
  
      // Jika sebelumnya sudah pernah rating
      if (prevRating > 0) {
        updatedTotalRating = updatedTotalRating - prevRating + ratingValue;
      } else {
        // Kalau belum pernah rating
        updatedTotalRating += ratingValue;
        updatedRatingCount += 1;
      }
  
      const newAverageRating = updatedTotalRating / updatedRatingCount;
  
      await axios.patch(`${URL_PRODUCT}/${id}`, {
        totalRating: updatedTotalRating,
        ratingCount: updatedRatingCount,
        rating: newAverageRating,
      });
  
      setUserRating(ratingValue);
      localStorage.setItem(`rated_${id}`, ratingValue);
  
      setProduct((prev) => ({
        ...prev,
        totalRating: updatedTotalRating,
        ratingCount: updatedRatingCount,
        rating: newAverageRating,
      }));
    } catch (err) {
      console.error("Gagal mengubah rating", err);
    }
  };  

  if (!product) {
    return <p className="text-center py-20">Memuat detail produk... 🌀</p>;
  }

  const finalPrice =
    product.price - (product.price * (product.discount || 0)) / 100;

  return (
    <div className="max-w-8xl mx-auto px-6 py-8 mt-24 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Kiri: Gambar Produk */}
        <div className="md:col-span-4">
          <Zoom>
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-auto rounded-lg object-cover cursor-zoom-in shadow-md"
            />
          </Zoom>
        </div>

        {/* Tengah: Nama & Deskripsi */}
        <div className="md:col-span-5">
          <h2 className="text-2xl font-poppins">{product.name}</h2>

          <div className="flex items-center gap-1 text-yellow-500 text-sm mt-2 mb-4">
            ⭐ {product.rating?.toFixed(1) || 0}
            <span className="text-gray-500 ml-2">
              | {product.sales || 0} Terjual
            </span>
          </div>

          <h3 className="text-2xl font-bold mb-2">Deskripsi Produk</h3>
          <p className="text-gray-500">{product.description}</p>
        </div>

        {/* Kanan: Form Pembelian */}
        <div className="md:col-span-3 bg-gray-50 p-6 rounded-lg shadow-inner">
          <p className="font-poppins text-2xl font-bold mb-3">
            Atur jumlah dan catatan
          </p>

          <p className="text-2xl font-bold mb-2">
            Rp{finalPrice.toLocaleString("id-ID")}
          </p>

          {product.discount > 0 && (
            <div className="flex items-center gap-2 text-sm mb-4">
              <p className="text-gray-400 line-through">
                Rp{product.price.toLocaleString("id-ID")}
              </p>
              <span className="text-red-500 font-bold">
                {product.discount}%
              </span>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Kuantitas</label>
            <div className="flex items-center border rounded-md w-max">
              <button
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-14 text-center border-x outline-none"
                min="1"
                max={product.stock || 1}
              />
              <button
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                onClick={() =>
                  setQuantity((prev) =>
                    Math.min(prev + 1, product.stock || prev + 1)
                  )
                }
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          {/* Stok */}
          <p className="text-sm text-gray-500 mb-4">
            Stok: {product.stock ?? 0}
          </p>

          <button
            onClick={handleBuy}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition mb-4"
          >
            Beli Sekarang
          </button>

          {/* Rating */}
          <div>
            <p className="font-semibold mb-2">Beri Rating</p>
            <div className="flex gap-1 text-2xl cursor-pointer">
              {Array.from({ length: 5 }, (_, i) => {
                const ratingValue = i + 1;
                const isFilled =
                  userRating > 0
                    ? ratingValue <= userRating
                    : ratingValue <= Math.round(product.rating || 0);

                return (
                  <span
                    key={i}
                    onClick={() => handleRating(ratingValue)}
                    className={isFilled ? "text-yellow-500" : "text-gray-300"}
                    role="button"
                  >
                    {isFilled ? "⭐" : "☆"}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
