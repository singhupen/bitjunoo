import { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import FeaturedArticle from "@/components/blog/FeaturedArticle";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogNewsletter from "@/components/blog/BlogNewsletter";

export const metadata: Metadata = {
  title: "Engineering Blog & Tech Insights | BitJunoo",
  description: "Technical articles, system architecture post-mortems, and performance benchmarks from the senior software engineers and architects at BitJunoo.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        badge="ENGINEERING DISPATCH & INSIGHTS"
        title="Field Notes on"
        titleHighlight="High-Scale Software"
        description="In-depth technical guides, microservices case studies, and performance optimizations directly from our engineering frontlines."
      />

      <FeaturedArticle />
      <BlogGrid />
      <BlogNewsletter />
    </>
  );
}
