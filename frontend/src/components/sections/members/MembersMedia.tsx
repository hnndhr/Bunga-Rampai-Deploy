"use client";

import { motion } from "framer-motion";
import CardMember from "@/components/ui/CardMembers";
import { MontserratText } from "@/components/ui/FontWrappers";

export default function embersMedia() {
  const members = [
    {
      name: "Media Branding",
      role: "Kedirjenan Kementerian",
      image: "https://ik.imagekit.io/hnndhr/Members/Media_Utama.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Media_Second.jpg",
    },
    {
      name: "Lintang Hikaru Firdauza",
      role: "Direktur Jenderal",
      image: "https://ik.imagekit.io/hnndhr/Members/Lintang_Bebas.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Lintang_Kedirjenan.jpg",
      desc: "Sebuah kehormatan bisa bertemu teman-teman RND, dengan cerita, tempat, dan karakter yang beragam. RND menambah pemahaman saya tentang data serta mengasah soft skill, khususnya media dan branding. Terima kasih Mba Laili sebagai penopang kementerian, juga apresiasi untuk Media Branding 2025 Hana, Rara, Reval, dan Marvel yang sudah tumbuh dan membersamai datalks 1 periode. Terima kasih RND sudah hadir mewarnai hidup Lintang senang mengenal kalian<3!!",
    },
    {
      name: "Media Branding",
      role: "Kedirjenan Kementerian",
      image: "https://ik.imagekit.io/hnndhr/Members/Media_Second.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Media_Utama.jpg",
    },
    {
      name: "Arinta Naura Kamila",
      role: "Staff",
      image: "https://ik.imagekit.io/hnndhr/Members/Rara_Bebas.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Rara_Kedirjenan.jpg",
      desc: "Kementerian Riset dan Data menjadi wadah penting bagiku untuk belajar dan mengembangkan diri, tidak hanya seputar riset maupun data, tetapi juga kerja sama tim, komunikasi, serta manajemen waktu. Di kedirjenan media dan branding, aku yang awalnya minim pengalaman dalam editing, pembuatan konten, dan publikasi justru banyak belajar. Walau sering menghadapi deadline, pengalaman ini melatih kedisiplinan, menambah wawasan, dan mengasah kreativitas bagiku.",
    },
    {
      name: "Faiq Marvel Muhammad",
      role: "Staff",
      image: "https://ik.imagekit.io/hnndhr/Members/Marvel_Bebas.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Marvel_Kedirjenan.jpg",
      desc: "Selama jadi salah satu dari 3 PJ sosmed di RnD, aku belajar banyak tentang konsistensi, kreativitas, dan pentingnya teamwork. Aku juga belajar tentang ''gimana sih caranya meningkatkan insight sosmed'' RnD itu bukan sekadar divisi, tapi rumah belajar bareng teman-teman yang selalu supportif. ",
    },
    {
      name: "Hana Nadhira Kusuma",
      role: "Staff",
      image: "https://ik.imagekit.io/hnndhr/Members/Hana_Bebas.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Hana_Kedirjenan.jpg",
      desc: "Sebuah kebanggan bisa menjadi bagian dari Kementerian Riset dan Data, khususnya di Kedirjenan Media Branding. Di sini, aku bertemu dengan teman-teman hebat, membuat pengalaman berharga, serta belajar banyak hal baru. Terima kasih untuk Kementerian Riset dan Data serta Media Branding atas segala kisah luar biasa selama ini. Aku senang bisa mengenal kalian semua, sampai jumpa di halaman cerita berikutnya😸",
    },
    {
      name: "Reval Aulia Rahman Erlangga",
      role: "Staff",
      image: "https://ik.imagekit.io/hnndhr/Members/Reval_Bebas.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Reval_Kedirjenan.jpg",
      desc: "haloo semuanya! kenalin nama aku Reval Aulia Rahman Erlangga dari prodi Matematika '24. di kementerian RND, aku diamanahi sebagai PJ sosmed datalks bersama rara dan marvel. aku juga megang ig datalks.summit loh!. pengalamanku selama ± 3 bulan di rnd adalah pengalaman yang luar biasa!. banyak banget orang orang hebat & hangat disini. harapannya bersama rnd, aku bisa menjadi versi diriku yang lebih baik! terima kasih banyak rnd setengah periodenya!",
    },
  ];

  return (
    <section className="relative py-12 overflow-hidden">
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
            className="text-white text-center font-extrabold text-3xl md:text-5xl mb-16 tracking-wide"
          >
            KEDIRJENAN MEDIA BRANDING
          </motion.h2>
        </MontserratText>

        {/* === BARIS STAF === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {members.slice(0, 7).map((member, index) => (
            <CardMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
