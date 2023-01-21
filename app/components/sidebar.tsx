import type { Post, Tag } from "@prisma/client";

import MiniPosts from "~/components/mini-posts";
import Tags from "~/components/tags";

interface SidebarProps {
    featuredPosts: Post[];
    latestPosts: Post[];
    tags: Tag[];
}

export function Sidebar({ featuredPosts, latestPosts, tags }: SidebarProps) {
    return (
        <div className="bg-panel-light dark:bg-panel-dark p-8 rounded-2xl shadow-l dark:shadow-d">
            <MiniPosts posts={featuredPosts} heading="Featured Posts" />
            <Tags tags={tags} showHeader />
            <MiniPosts posts={latestPosts} heading="Latest Posts" />
        </div>
    );
}
