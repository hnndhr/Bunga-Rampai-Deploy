"use client";

import clsx from "clsx";

//Home -> Bunga Rampai

export default function IntroSection() {
  const imagePanels = [
    { style: { backgroundPosition: "0% 50%" }, offset: false },
    { style: { backgroundPosition: "50% 50%" }, offset: true },
    { style: { backgroundPosition: "100% 50%" }, offset: false },
  ];

  return (
    // REVERSE: gradient dari emerald-900 ke slate-900 (kebalikan dari Hero)
    <section className="relative min-h-screen bg-gradient-to-br flex items-center justify-center from-emerald-900 via-emerald-800 to-slate-900 text-white py-24 overflow-hidden">
      {/* REVERSE Decorative Blur Elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 via-slate-800 to-emerald-900"></div>

      <div className="container mx-auto px-8 md:px-16 lg:px-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* BAGIAN KIRI: Teks */}
          <div className="lg:w-1/2 space-y-5 text-justify lg:text-justify">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              BUNGA RAMPAI
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              Bunga Rampai adalah website yang merangkum berbagai hasil riset dan survei
              dari Kementerian Riset dan Data selama satu periode kepengurusan. Melalui
              platform ini, kami ingin menghadirkan data dan temuan riset dengan cara yang
              lebih terbuka, mudah diakses, dan relevan bagi siapa pun yang ingin mengenal
              lebih jauh hasil kerja kami.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              Semua informasi disajikan dalam bentuk infografis yang menarik dan informatif,
              agar pembaca bisa memahami isi data dengan cepat tanpa harus membaca laporan
              panjang. Dengan pendekatan visual ini, Bunga Rampai diharapkan menjadi ruang
              yang tidak hanya membagikan hasil penelitian, tapi juga menumbuhkan rasa ingin
              tahu dan apresiasi terhadap data dan riset itu sendiri.
            </p>
          </div>

          {/* BAGIAN KANAN: Gambar Panel */}
          <div className="lg:w-1/2">
            <div className="flex items-center justify-center gap-3">
              {imagePanels.map((panel, index) => (
                <div
                  key={index}
                  className={clsx(
                    "rounded-lg bg-cover bg-center shadow-lg transition-transform duration-300 hover:scale-105",
                    {
                      // ukuran panel tengah lebih besar
                      "h-[280px] w-[120px] md:h-[360px] md:w-[160px] lg:h-[420px] lg:w-[180px]": index === 1,
                      "h-[220px] w-[100px] md:h-[300px] md:w-[140px] lg:h-[320px] lg:w-[155px]": index !== 1,
                    }
                  )}
                  style={{
                    backgroundImage: "url('/images/flower-image.jpg')",
                    ...panel.style,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
