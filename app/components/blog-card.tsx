import { Link } from "@remix-run/react";
import type { Post } from "@prisma/client";
import { BaseImage } from "remix-image";
import dayjs from "dayjs"

import Tags from "~/components/tags";

interface BlogCardProps {
    post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
    const tags = JSON.parse(post.tags);
    const date = dayjs(post.createdAt).format('MMM DD, YYYY')

    return (
        <article className="flex flex-wrap sm:flex-nowrap bg-panel-light dark:bg-panel-dark p-8 rounded-2xl shadow-l dark:shadow-d mb-12" key={post.slug}>
            <div className="sm:mr-8 mb-8 sm:mb-0">
                <Link to={`/posts/${post.slug}`}>
                    <BaseImage
                        className="rounded-xl"
                        loaderUrl="/api/image"
                        src={post.image}
                        width={272}
                    />
                </Link>
            </div>
            <div className="flex=[1-1-300px] md:relative">
                <Tags tags={tags} />
                <h2 className="mt-0 mb-5 text-3xl font-semibold leading-4xl">
                    <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                </h2>
                <div className="post-excerpt mb-4 leading-6 h-auto overflow-hidden">
                    {post.description}
                </div>
                <div className="text-sm flex text-meta md:absolute md:bottom-0">
                    <span className="mr-4">
                        {post.author}
                    </span>
                    <time className="mr-4" dateTime="2022-04-24">
                        {date}
                    </time>
                </div>
            </div>
        </article>
    );
}
