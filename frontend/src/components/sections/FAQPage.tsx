"use client";

import Link from "next/link";

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            1. Apa itu Bunga Rampai?
          </h2>
          <p>
            Bunga Rampai adalah website yang merangkum berbagai hasil
            riset dan survei dari Kementerian Riset dan Data selama satu periode
            kepengurusan. Melalui platform ini, kami ingin menghadirkan data dan
            temuan riset dengan cara yang lebih terbuka, mudah diakses, dan relevan
            bagi siapa pun yang ingin mengenal lebih jauh hasil kerja kami.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            2. Siapa yang mengelola Bunga Rampai?
          </h2>
          <p>
            Proyek ini dikelola oleh tim dari
            Kementerian Riset dan Data BEM UNS.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            3. Apakah semua orang bisa mengakses Bunga Rampai?
          </h2>
          <p>
            Ya! Semua konten survei di website Bunga Rampai dapat
            diakses secara publik.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Apakah data saya aman?</h2>
          <p>
            Kami menjaga kerahasiaan data pengguna sesuai dengan{" "}
            <Link
              href="/privacy"
              className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors"
            >
              Kebijakan Privasi
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            5. Bagaimana cara menghubungi tim Bunga Rampai?
          </h2>
          <p>
            Anda dapat mengirimkan pesan melalui kontak yang tersedia di bagian akhir
            halaman.
          </p>
        </div>
      </section>
    </div>
  );
}
