import { Link } from "@remix-run/react";
import type { Post } from "@prisma/client";
import { BaseImage } from "remix-image";
import dayjs from "dayjs";

interface MiniPostProps {
  posts: Post[];
  heading?: string;
}

export default function MiniPost({ posts, heading }: MiniPostProps) {
  return (
    <div className="mt-14 first:mt-0">
      <h3 className="mt-0 mb-8 text-xl leading-5 font-semibold">{heading}</h3>
      {posts.slice(0, 3).map((post: Post) => {
        const date = dayjs(post.createdAt).format("MMM DD, YYYY");

        return (
          <article className="mb-8 flex" key={post.slug}>
            <div className="mr-4 min-w-[80px]">
              <Link to={`${post.slug}`} prefetch="render">
                <BaseImage
                  className="rounded-xl w-[80px]"
                  loaderUrl="/api/image"
                  src={post.image}
                  width="80"
                />
              </Link>
            </div>
            <div className="relative">
              <h3 className="font-medium leading-6 mb-2 mt-0">
                <Link to={`${post.slug}`} prefetch="render">
                  {post.title}
                </Link>
              </h3>
              <div className="text-sm flex text-meta absolute bottom-0">
                <time className="mr-4" dateTime="2022-04-24">
                  {date}
                </time>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
