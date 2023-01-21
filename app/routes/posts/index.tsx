import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { BlogCard } from "~/components/blog-card";
import type { Post } from "@prisma/client";
import { getPosts } from "~/models/post.server";

export const loader = async () => {
    return json({ posts: await getPosts() });
};

export default function Posts() {
    const { posts } = useLoaderData<typeof loader>();
    return (
        <>
            {posts.map((post: Post) => <BlogCard post={post} key={post.slug} />)}
        </>
    );
}
