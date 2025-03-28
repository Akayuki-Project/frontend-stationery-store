import React, { useState } from "react";
import detail1 from "../../assets/detail/detail1.png";

const DetailProduct = () => {
  const [quantity, setQuantity] = useState(1);

  // Fungsi untuk menangani perubahan input kuantitas
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(value < 1 ? 1 : value); // Minimal 1
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-10 min-h-screen mt-24">
      {/* Bagian atas (Gambar & Info Produk) */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Gambar Produk */}
        <img
          src={detail1}
          alt="Koreksi Tape Mini Kamera Pastel"
          className="w-full md:w-1/2 max-w-sm object-cover rounded-lg"
        />

        {/* Info Produk */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl md:text-2xl font-semibold">
            Koreksi Tape Mini Kamera Pastel
          </h2>
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            ⭐ 4.9 <span className="text-gray-500">| 1.4RB Penilaian</span>
          </div>
          <p className="text-red-500 text-2xl font-bold mt-2">Rp28.900</p>
          <p className="text-gray-400 text-sm line-through">Rp35.000</p>

          {/* Kuantitas */}
          <div className="mt-4">
            <p className="mb-2">Kuantitas</p>
            <div className="flex items-center border rounded-lg w-max">
              <button
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-14 text-center border-x outline-none"
                min="1"
              />
              <button
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Button Beli Sekarang */}
          <button className="mt-6 w-full bg-primary text-white text-lg font-semibold py-3 rounded-md shadow-md transition duration-300 hover:bg-green-600">
            Beli Sekarang
          </button>
        </div>
      </div>

      {/* Deskripsi Produk */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold">Deskripsi Produk</h3>
        <p className="text-gray-600 mt-2">
          Produk ini adalah koreksi tape berbentuk kamera vintage yang stylish
          dan unik. Dengan desain menyerupai kamera klasik, koreksi tape ini
          tidak hanya berfungsi untuk memperbaiki kesalahan tulisan dengan rapi,
          tetapi juga menjadi aksesori menarik di meja kerja atau sekolah.
        </p>
        <h4 className="font-semibold mt-4">Fitur Produk:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>📷 Desain Unik – Bentuk kamera mini dengan detail lensa yang realistis.</li>
          <li>🎨 Pilihan Warna Menarik – Tersedia dalam warna pastel seperti pink dan abu-abu.</li>
          <li>✅ Penggunaan Mudah – Cukup geser pada kertas untuk menutupi kesalahan tulisan.</li>
          <li>♻️ Refillable – Bisa diisi ulang untuk pemakaian jangka panjang.</li>
          <li>👜 Ukuran Compact – Mudah dibawa ke sekolah, kantor, atau digunakan di rumah.</li>
        </ul>
      </div>
    </div>
  );
};

export default DetailProduct;
