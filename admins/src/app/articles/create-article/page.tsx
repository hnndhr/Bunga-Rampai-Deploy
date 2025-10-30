// app/article/[slug]/page.tsx
import React from 'react';
import AdminArticleCreatePage from '@/components/CreatePageArticle';

interface Props {
  params: { slug: string };
}

export default function Page({ params }: Props) {
  const { slug } = params;
  // Because ArticleSection is a client component, just pass slug to it
  return (
    <main >
      <AdminArticleCreatePage/>
    </main>
  );
}
