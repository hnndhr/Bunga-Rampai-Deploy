// app/article/[slug]/page.tsx
import React from "react";
import ArticleSection from "@/components/sections/ArticleSection";
import Footer from "@/components/layout/Footer";

interface Props {
  params: { slug: string };
}

export default function Page({ params }: Props) {
  const { slug } = params;
  // Because ArticleSection is a client component, just pass slug to it
  return (
    <main>
      <ArticleSection slug={params.slug} />
      <Footer></Footer>
    </main>
  );
}
