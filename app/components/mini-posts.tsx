import { Link } from "@remix-run/react";
import type { Post } from "@prisma/client";
import Image from "remix-image";
import dayjs from "dayjs"

interface MiniPostProps {
    posts: Post[];
    heading?: string;
}

export default function MiniPost({ posts, heading }: MiniPostProps) {

    return (
        <div className="mt-14 first:mt-0">
            <h3 className="mt-0 mb-8 text-xl leading-5 font-semibold">{heading}</h3>
            {posts.slice(0, 3).map((post: Post) => {
                const date = dayjs(post.createdAt).format('MMM DD, YYYY')

                return (
                    <article className="mb-8 flex" key={post.slug}>
                        <div className="mr-4">
                            <Link to={`/posts/${post.slug}`} prefetch="render">
                                <Image
                                    className="w-full h-full rounded-lg"
                                    loaderUrl="/api/image"
                                    src={post.image}
                                    responsive={[
                                        {
                                            size: {
                                                width: 80,
                                                height: 80,
                                            },
                                        },
                                    ]}
                                />
                            </Link>
                        </div>
                        <div className="relative">
                            <h3 className="font-medium leading-6 mb-2 mt-0">
                                <Link to={`/posts/${post.slug}`} prefetch="render">{post.title}</Link>
                            </h3>
                            <div className="text-sm flex text-meta absolute bottom-0">
                                <time className="mr-4" dateTime="2022-04-24">
                                    {date}
                                </time>
                            </div>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}
