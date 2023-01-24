import type { Post, Tag } from "@prisma/client";

import Tags from "~/components/tags";

import MiniPosts from "./mini-posts";

interface FooterProps {
  featuredPosts: Post[];
  latestPosts: Post[];
  tags: Tag[];
}

export function Footer({ featuredPosts, latestPosts, tags }: FooterProps) {
  return (
    <footer className="bg-panel-light dark:bg-panel-dark py-12 px-0 mt-20">
      <div className="xl:container">
        <div className="flex flex-wrap">
          <div className="md:max-w-[50%] md:flex-[0_0_50%] lg:max-w-[33%] lg:flex-[0_0_33%] w-full px-5">
            <div className="mt-14">
              <MiniPosts posts={latestPosts} heading="Latest Posts" />
            </div>
          </div>
          <div className="md:max-w-[50%] md:flex-[0_0_50%] lg:max-w-[33%] lg:flex-[0_0_33%] w-full px-5">
            <div className="mt-14">
              <MiniPosts posts={featuredPosts} heading="Featured Posts" />
            </div>
          </div>
          <div className="md:max-w-[50%] md:flex-[0_0_50%] lg:max-w-[33%] lg:flex-[0_0_33%] w-full px-5">
            <div className="mb-11 mt-14">
              <Tags tags={tags} showHeader />
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm text-center">
        © 2023 <a href="https://neon.gbjsolution.com">Neil Huyton</a>
      </div>
    </footer>
  );
}
