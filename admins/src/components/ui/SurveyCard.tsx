import Image from "next/image";
import Link from "next/link";

type SurveyCardProps = {
  image: string;
  title: string;
  category: string;
};

export default function SurveyCard({ image, title, category }: SurveyCardProps) {
  return (
    <Link
      href="#"
      className="block group overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105"
    >
      <div className="relative h-[480px] w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-110"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        {/* Overlay gradien agar teks terbaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Teks di bawah */}
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <span className="text-sm font-semibold uppercase tracking-wider text-yellow-400">
            {category}
          </span>
          <h3 className="text-2xl font-bold mt-2 leading-tight drop-shadow-md">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
