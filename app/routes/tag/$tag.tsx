import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BlogCard } from "~/components/blog-card";
import type { Post } from "@prisma/client";
import invariant from "tiny-invariant";

import { getPostsByTag } from "~/models/post.server";

export const loader = async ({
    params,
}: LoaderArgs) => {
    invariant(params.tag, "tag not found");
    return json({ posts: await getPostsByTag(params.tag) });
};

export default function Tag() {
    const { posts } = useLoaderData<typeof loader>();
    return (
        <>
            {posts.map((post: Post) => <BlogCard post={post} key={post.slug} />)}
        </>
    );
}
