import UpdatePageArticle from "@/components/sections/admin-page/UpdatePageArticle";

export default function Page({ params }: { params: { slug: string } }) {
  return <UpdatePageArticle slug={params.slug} />;
}
