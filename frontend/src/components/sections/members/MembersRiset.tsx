"use client";

import { motion } from "framer-motion";
import CardMember from "@/components/ui/CardMembers";
import { MontserratText } from "@/components/ui/FontWrappers";

export default function MembersRiset() {
  const members = [
    {
      name: "Riset dan Analisis",
      role: "Kedirjenan Kementerian",
      image: "https://ik.imagekit.io/hnndhr/Members/Riset_Utama.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Riset_Second.jpg",
      desc: "",
    },
    {
      name: "Erlina Dwi Cahyani",
      role: "Direktur Jenderal",
      image: "https://ik.imagekit.io/hnndhr/Members/Erlina_Bebas.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Erlina_Kedirjenan.jpg",
      desc: "Cinta banget sama RnD! Dulu ga berekspektasi apapun, tapi ternyata bertemu dengan orang-orang yang seru dan kocak. Dengan posisiku sebagai dirjen, ada suka dukanya ngurus anak-anak dengan berbagai karakter. Capek itu pasti, tapi dengan kita jalanin bareng-bareng ga kerasa cepet juga waktu berlalu.  Aku berharap, perjalanan kita satu periode ini meninggalkan kesan baik yang membekas di teman-teman semua. I love you all, see u on top!",
    },
    {
      name: "Riset dan Analisis",
      role: "Kedirjenan Kementerian",
      image: "https://ik.imagekit.io/hnndhr/Members/Riset_Second.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Riset_Utama.jpg",
    },
    {
      name: "Adib Barliyin Abdurrahim",
      role: "Staff",
      image: "https://ik.imagekit.io/hnndhr/Members/Adib_Bebas.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Adib_Kedirjenan.jpg",
      desc: "Seru, exiting, memberi banyak pengalaman, melatih kepemimpinan. Di luar semua itu, semoga RnD kedepannya menjadi sebuah tempat untuk membentuk dan menempa individu menjadi seorang yang dapat bersaing di era serba kompetitif seperti sekarang. (ini udah panjang kocak, kok gabisa dikirimmmm)",
    },
    {
      name: "Aulia Rahma Bidayah",
      role: "Staff",
      image: "https://ik.imagekit.io/hnndhr/Members/Aul_Bebas.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Aul_Kedirjenan.jpg",
      desc: "Setiap momen bersama RnDolan adalah bagian dari perjalanan yang sangat berkesan. Dari awal kita masih sama' canggung, bingung dengan ritme proker, sampai akhirnya bisa saling mengenal, tertawa, dan menghadapi banyak hal bareng'. Aku sangat bersyukur bisa mengenal mereka dan menjadi support system satu sama lain. Semoga setelah demis, kita tetap saling mendukung dan mendoakan agar sukses di jalan masing'. Aku yakin cerita' hebat kita tidak akan berhenti sampai di sini.",
    },
    {
      name: "Ayatundira Setyoningrum",
      role: "Staff",
      image: "https://ik.imagekit.io/hnndhr/Members/Ayak_Bebas.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Ayak_Kedirjenan.jpg",
      desc: "Hai, aku ayak, salah satu staf RnD di kedirjenan Riset dan Analisis. Pada kedirjenan ini, aku memegang program kerja Data Kita. Sepanjang perjalananku di RnD, aku sangat senang dengan lingkungan dan teman teman yang baikkk. pengalaman yang aku rasakan ketika menjadi bagian dari RnD sangat berkesan dan memberikan kenangan indah. ",
    },
    {
      name: "Faiz Nugroho",
      role: "Staff",
      image: "https://ik.imagekit.io/hnndhr/Members/Faiz_Bebas.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Faiz_Kedirjenan.jpg",
      desc: "Menjadi bagian Riset dan Data BEM UNS 2025 sangatlah asyig😹 Periode ini aku jadi orang yang ngechatin stranger buat nyari responden survei😩, ngolah data biar bisa dikonsumsi🤤 dan bikin laporan dari hasil surveinyaa😋Riset dan Data bagiku bukan cuman sekedar survei aja, tetapi sebisa mungkin apa yang kita sajikan bisa memberikan manfaat kepada audiens🥰🥵🥶 Semoga di next periode RND bisa terus berkembang dan bisa berkolaborasi dengan berbagai instansi🔥",
    },
    {
      name: "Ika Rahmawati",
      role: "Staff",
      image: "https://ik.imagekit.io/hnndhr/Members/Ika_Bebas.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Ika_Kedirjenan.jpg",
      desc: "awalnya aku ngga nyangka bisa jadi PJ Data Bites, tiap bulan jadi seleb datalks 😮⁉️ dari mikirin topik sampai bikin konten, aku seneng banget jalanin proker ini. yang bikin tambah seru itu suasana bareng temen-temen RnD, selalu hangat dan rame. Sobat RNDOLANN emang bikin betah! 💕",
    },
    {
      name: "Naufal Fawwaz Widjaya",
      role: "Staff",
      image: "https://ik.imagekit.io/hnndhr/Members/Fawwaz_Bebas.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Fawwaz_Kedirjenan.jpg",
      desc: "Halo! perkenalkan namaku Fawwaz. Aku berasal dari Fakultas para serigala apalagi kalau bukan Fakultas Teknik, tepatnya di Program Studi Teknik Sipil angkatan 2024. Saat ini aku Staf di Kementerian Riset dan Data, khususnya di Direktorat Jenderal Riset Analisis. Di RnD Aku mendapatkan banyak pengalaman berharga, mulai dari bagaimana cara mengolah data hingga menganalisis data agar dapat memberikan manfaat bagi banyak orang.",
    },
    {
      name: "Nadia Putri Anggraini",
      role: "Staff",
      image: "https://ik.imagekit.io/hnndhr/Members/Nadia_Bebas.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Nadia_Kedirjenan.jpg",
      desc: "Halo, Aku Nadia dari FMIPA angkatan 2023. Suatu kebanggaan buat aku bisa jadi bagian RNDOLAN. Di sini aku bisa mengembangkan kemampuanku sekaligus menyalurkannya agar bermanfaat untuk banyak orang melalui berbagai survei yang dijalankan. Selain itu, aku juga senang banget bisa bertemu dengan orang-orang yang unik, seru, dan penuh semangat, yang selalu saling mendukung satu sama lain (apalagi pas lagi cari responden, hehe). Terimakasih para anomali RNDOLAN. Sayang RnD banyak-banyak <3.",
    },
    {
      name: "Nashrin Alamsyah Puspa Negara",
      role: "Staff",
      image: "https://ik.imagekit.io/hnndhr/Members/Nashrin_Bebas.jpg",
      imageBack: "https://ik.imagekit.io/hnndhr/Members/Nashrin_Kedirjenan.jpg",
      desc: "Memilih RnD adalah keputusan besar yang penuh tantangan, tapi juga penuh makna. Dari awal yang berat hingga momen seru bareng anak anak Riset dan Analisis, aku menemukan keluarga yang selalu mendukung. Persiapan Datalks Summit jadi ujian nyata, tapi juga bukti bahwa kerja sama bisa menaklukkan segalanya. Di sini aku belajar, keberanian untuk mencoba lebih berharga daripada sekadar keahlian.",
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
            KEDIRJENAN RISET DAN ANALISIS
          </motion.h2>
        </MontserratText>

        {/* === BARIS STAF === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-8">
          {members.slice(0, 11).map((member, index) => (
            <CardMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
