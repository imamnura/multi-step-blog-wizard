import HomePageClient from "@/components/HomePageClient";

export async function generateMetadata() {
  return {
    title: "Home - Blog Wizard",
    description: "Welcome to Blog Wizard, create and manage your blog posts",
    openGraph: {
      title: "Home - Blog Wizard",
      description: "Welcome to Blog Wizard, create and manage your blog posts",
      type: "website",
      url: "/",
    },
    alternates: {
      canonical: "/",
    },
  };
}

export default function HomePage() {
  return <HomePageClient />;
}
