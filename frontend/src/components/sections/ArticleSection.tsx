"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FileText,
  Calendar,
  Hand,
  Handshake,
  Users,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import BlockRenderer from "./admin-page/BlocksRenderer";
import InfographicIntro from "./InfographicIntro";
import { motion } from "framer-motion";
import { getFullArticle } from "@/lib/supabaseQueries";

type Block = {
  id: string;
  ordering: number;
  block_type?: string;
  content: any;
  caption?: string;
};

type Article = {
  id: string;
  slug: string;
  title: string;
  header_image?: string | null;
  blocks: Block[];
  respondents?: number;
  period?: string;
  method?: string;
  survey_type?: string;
  report_link?: string;
  infographic_link?: string;
};

export default function ArticleSection({ slug }: { slug: string }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
  if (!slug) return;

  const fetchArticle = async () => {
    setLoading(true);
    setError(null);

    const fullArticle = await getFullArticle(slug);

    if (!fullArticle) {
      setError("Artikel tidak ditemukan");
      setArticle(null);
    } else {
      setArticle(fullArticle);
    }

    setLoading(false);
  };

  fetchArticle();
}, [slug]);

  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        {/* Background decorative blobs */}
        <motion.div
          className="absolute w-72 h-72 bg-blue-400/30 rounded-full blur-3xl -top-16 -left-16"
          animate={{ x: [0, 30, -20, 0], y: [0, 20, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl -bottom-24 -right-24"
          animate={{ x: [0, -30, 20, 0], y: [0, -20, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Shimmering skeleton card */}
        <div className="w-full max-w-3xl mx-auto px-6 py-10 animate-pulse">
          <div className="h-6 w-40 bg-gray-300/50 dark:bg-gray-700/50 rounded mb-8 mx-auto"></div>

          {/* Hero image skeleton */}
          <div className="w-full h-64 md:h-80 bg-gray-300/50 dark:bg-gray-700/50 rounded-2xl mb-8 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>

          {/* Article title + text skeleton */}
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
            <div className="h-6 w-1/2 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
            <div className="h-4 w-full bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
            <div className="h-4 w-4/5 bg-gray-300/50 dark:bg-gray-700/50 rounded"></div>
          </div>
        </div>

        {/* Animated text below */}
        <motion.p
          className="mt-10 text-gray-600 dark:text-gray-400 text-sm tracking-wide font-medium"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Memuat artikel, mohon tunggu sebentar...
        </motion.p>
      </div>
    );

  if (error)
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!article)
    return <div className="text-center py-20">Artikel tidak ditemukan.</div>;

  return (
    <main className="font-serif bg-white text-zinc-800">
      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full h-[300px] bg-gray-900 overflow-hidden">
        {/* Background Image */}
        {article.header_image && (
          <Image
            src={article.header_image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/55" />

        {/* Back Button */}
        <div className="absolute top-10 left-3 sm:left-6 md:left-8 lg:left-20 z-30">
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex items-center justify-center w-8 h-8 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 sm:w-7 h-6 sm:h-7" />
          </button>
        </div>

        {/* Title Section */}
        <div className="relative z-10 flex flex-col items-center justify-start h-full pt-20 sm:pt-24 md:pt-28 lg:pt-32 px-4 sm:px-8 md:px-16 lg:px-32 text-center">
          <h1 className="max-w-full text-xl sm:text-2xl md:text-3xl lg:text-5xl font-abhaya text-white font-medium leading-tight sm:leading-snug md:leading-tight lg:leading-tight tracking-wide">
            {article.title}
          </h1>
          <hr className="w-full md:w-full border-t border-white my-6 sm:my-6 md:my-6" />
        </div>

        {/* Info Badges */}
        <div className="absolute bottom-4 sm:bottom-6 left-2 sm:left-4 md:left-8 lg:left-32 flex flex-wrap items-center gap-1 sm:gap-2 md:gap-3 z-20">
          {article.respondents && (
            <InfoBadge
              icon={<Users />}
              text={`${article.respondents.toLocaleString()} Responden`}
            />
          )}
          {article.period && (
            <InfoBadge icon={<Calendar />} text={article.period} />
          )}
          {article.method && (
            <InfoBadge icon={<Hand />} text={article.method} />
          )}
          {article.survey_type && (
            <InfoBadge
              icon={<Handshake />}
              text={`Survei ${article.survey_type}`}
            />
          )}
          {article.report_link && (
            <a
              href={
                article.report_link?.startsWith("http")
                  ? article.report_link
                  : `https://${article.report_link}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <InfoBadge icon={<FileText />} text="Laporan Survei" clickable />
            </a>
          )}
        </div>
      </section>

      {/* ===== INFOGRAPHIC ===== */}
      {(() => {
        const infographicBlock = article.blocks?.find(
          (b) => b.block_type === "infographic_desc"
        );
        return (
          (article.infographic_link || infographicBlock) && (
            <InfographicIntro
              image={article.infographic_link}
              text={infographicBlock?.content}
            />
          )
        );
      })()}

      {/* ===== ARTICLE BODY ===== */}
      <article className="max-w-full sm:max-w-3xl md:max-w-4xl mx-auto px-2 md:px-4 pb-12 md:pb-16">
        <section className="prose prose-xl prose-p:leading-relaxed prose-p:my-4 sm:prose-p:my-5 md:prose-p:my-6 prose-headings:font-sans prose-headings:font-bold text-justify">
          {article.blocks
            ?.filter((b) => b.block_type !== "infographic_desc")
            .sort((a, b) => a.ordering - b.ordering)
            .map((block) => (
              <BlockRenderer key={block.id} block={block} />
            ))}
        </section>
      </article>
    </main>
  );
}

/* ===== COMPONENT: Info Badge ===== */
function InfoBadge({
  icon,
  text,
  clickable = false,
}: {
  icon: React.ReactNode;
  text: string;
  clickable?: boolean;
}) {
  return (
    <div
      className={`relative flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-3xl
                  min-w-[100px] sm:min-w-[120px] md:min-w-[140px]
                  bg-gradient-to-br from-white/5 to-white/5 backdrop-blur-md border border-white/20
                  shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_4px_10px_rgba(0,0,0,0.25)]
                  overflow-hidden transition-all duration-300
                  hover:from-white/25 hover:to-white/10 cursor-pointer`}
    >
      <span className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent opacity-60 rotate-12" />
      <span className="text-white relative z-10 flex items-center gap-1 text-xs sm:text-sm md:text-base font-montserrat font-medium whitespace-nowrap truncate">
        {React.cloneElement(icon as React.ReactElement, {
          className: "w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-white",
        })}
        {text}
      </span>
    </div>
  );
}
