import type { Post } from "@/types/post";
import PostDetailClient from "@/components/PostDetailClient";

type Params = { params: { id: string } };

export async function generateMetadata({ params }: Params) {
  const { id } = params;
  let title = "Post Not Found";
  let description = `Read the blog post ${id} created with the wizard.`;

  try {
    const raw = localStorage.getItem("blog-wizard-posts");
    const list = raw ? (JSON.parse(raw) as Post[]) : [];
    const post = list.find((x) => x.id === id);
    if (post) {
      title = post.title;
      description = post.summary;
    }
  } catch {
    // ignore
  }
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `/post/${id}`,
    },
    alternates: { canonical: `/post/${id}` },
  };
}

export default function PostPage() {
  return <PostDetailClient />;
}
