"use client";

import { motion } from "framer-motion";
import CardMember from "@/components/ui/CardMembers";
import { MontserratText } from "@/components/ui/FontWrappers";

export default function MembersPHT() {
  const members = [
    {
      name: "Riset dan Data",
      role: "Petinggi Kementerian",
      image: "https://ik.imagekit.io/hnndhr/Members/PHT_Utama.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/PHT_Second.jpg",
    },
    {
      name: "Fathiya Noor Jannah",
      role: "Menteri Koordinator",
      image: "https://ik.imagekit.io/hnndhr/Members/Fath_Bebas.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Fath_Kementerian.jpg",
      desc: "Be part of RND 2025 adalah sebuah kebanggaan. Melihat kalian semua bersemi dan bermekaran, saling menguatkan dengan senyum dari pap fawwaz, tawa dari ratusan tragedii, dan kejailan aryak (semoga dia abisni tobat). Terima kasih sudah berdinamika bareng.Time will be over, but memories stay. Senang menghabiskan sisa semester bersama anak-anak baik inii, good luck on your way<3 Bangga punya Lail as menteri, serta seluruhnya yg gabisa disebut krn kuota karakter. Sayang semua🌻",
    },
    {
      name: "Riset dan Data",
      role: "Petinggi Kementerian",
      image: "https://ik.imagekit.io/hnndhr/Members/PHT_Second.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/PHT_Utama.jpg",
    },
    {
      name: "Aidan Muhammad Alfath",
      role: "Wakil Menteri",
      image: "https://ik.imagekit.io/hnndhr/Members/Aidan_Bebas.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Aidan_Kementerian.jpg",
      desc: "Seorang mahasiswa teknik yang secara penampilan dan gaya hidupnya tidak kelihatan seperti teknik sama sekali sehingga sering dikira dari fakultas lain, Sifatnya bisa dibilang introvert namun beliau tidak bisa diam, entah itu sekadar muter-muter kota, nongkrong di tempat baru, atau sekadar menikmati suasana luar, kegiatan itu jadi cara ia untuk refreshing. Semakin mengenal orang tersebut, semakin unik hal-hal yang diawal tidak terlihat.",
    },
    {
      name: "Laili Kharisma Octavia",
      role: "Menteri",
      image: "https://ik.imagekit.io/hnndhr/Members/Laili_Bebas.JPG",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Laili_Kementerian.JPG",
      desc: "Feel so proud & grateful! Di penghujung kuliah aku berkesempatan memimpin keluarga kecilku, yaitu Riset dan Data. Aku belajar banyak hal, leadership, emotional intelligence, problem solving, n many more. Lebih dari itu, aku merasa bangga kepada setiap satu dari semua anak RnD. Mereka mau belajar dan selalu bertanggungjawab atas setiap bagian kecil dari apa yang menjadi tanggungjawab mereka, serta selalu membentuk lingkungan pertemanan yg sehat. I feel so lucky to be part of this solid team!",
    },
    {
      name: "Arya Maulana Putra",
      role: "Sekretaris Menteri",
      image: "https://ik.imagekit.io/hnndhr/Members/Arya_Bebas.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Arya_Kementerian.jpg",
      desc: "Sangat suka walau terkadang tidak suka dan juga sedikit suka wkkwkw ngga ngga, ya semoga kalian mendapat apa yang kalian harapkan disini, terimakasih sudah menjadi bagian dari keluarga kecil ini, senang mengingat kalian, apapun yang positif diambil saja ges tapi yang negatif jangan yah, ingat DIATAS LANGIT ADA LANGIT DIBAWAH BUMI ADA PERAIRAN",
    },
    {
      name: "Erlina Dwi Cahyani",
      role: "Direktur Jenderal",
      image: "https://ik.imagekit.io/hnndhr/Members/Erlina_Bebas.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Erlina_Kementerian.jpg",
      desc: "Cinta banget sama RnD! Dulu ga berekspektasi apapun, tapi ternyata bertemu dengan orang-orang yang seru dan kocak. Dengan posisiku sebagai dirjen, ada suka dukanya ngurus anak-anak dengan berbagai karakter. Capek itu pasti, tapi dengan kita jalanin bareng-bareng ga kerasa cepet juga waktu berlalu.  Aku berharap, perjalanan kita satu periode ini meninggalkan kesan baik yang membekas di teman-teman semua. I love you all, see u on top!",
    },
    {
      name: "Lintang Hikaru Firdauza",
      role: "Direktur Jenderal",
      image: "https://ik.imagekit.io/hnndhr/Members/Lintang_Bebas.jpg",
      imageBack:
        "https://ik.imagekit.io/hnndhr/Members/Lintang_Kementerian.jpg",
      desc: "Sebuah kehormatan bisa bertemu teman-teman RND, dengan cerita, tempat, dan karakter yang beragam. RND menambah pemahaman saya tentang data serta mengasah soft skill, khususnya media dan branding. Terima kasih Mba Laili sebagai penopang kementerian, juga apresiasi untuk Media Branding 2025 Hana, Rara, Reval, dan Marvel yang sudah tumbuh dan membersamai datalks 1 periode. Terima kasih RND sudah hadir mewarnai hidup Lintang senang mengenal kalian<3!!",
    },
    {
      name: "Muhammad Syahrul",
      role: "Direktur Jenderal",
      image: "https://ik.imagekit.io/hnndhr/Members/Syahrul_Bebas.jpg",
      imageBack:
        "https://ik.imagekit.io/hnndhr/Members/Syahrul_Kementerian.jpg",
      desc: "Saya Direktur Jenderal Kanal Informasi Kementerian Riset & Data BEM UNS. Saya bertanggung jawab penuh atas progres dan efektivitas penyebaran informasi kampus. Di bawah kepemimpinan saya, Kedirjenan ini berfokus menjadi penghubung vital untuk publikasi barang hilang dan mengelola platform terpercaya jual-beli barang bekas layak pakai guna mendukung efisiensi, kesadaran, dan keberlanjutan ekosistem kampus.",
    },
  ];

  return (
    <section className="relative py-2 overflow-hidden">
      {/* === Background Pattern === */}
      <div
        className="absolute inset-0 bg-[linear-gradient(120deg,#1C2940_1px,transparent_1px)] bg-[length:60px_60px] opacity-30"
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-6 lg:px-16">
        {/* === JUDUL ATAS === */}
        <MontserratText>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-center font-extrabold text-3xl md:text-5xl mb-20"
          >
            PETINGGI KEMENTERIAN RISET DAN DATA
          </motion.h2>
        </MontserratText>

        {/* === BARIS PERTAMA: 3 FOTO === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-8">
          <CardMember {...members[0]} /> {/* Riset & Data kiri */}
          <CardMember {...members[1]} /> {/* Menteri Koordinator */}
          <CardMember {...members[2]} /> {/* Riset & Data kanan */}
        </div>

        {/* === BARIS KEDUA DAN SETERUSNYA === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {members.slice(3).map((member, index) => (
            <CardMember key={index + 3} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
