import UpdatePageArticle from "@/components/UpdatePageArticle";

export default function Page({ params }: { params: { slug: string } }) {
  return <UpdatePageArticle slug={params.slug} />;
}
