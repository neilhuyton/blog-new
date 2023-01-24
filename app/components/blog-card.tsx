import { Link } from "@remix-run/react";
import type { Post } from "@prisma/client";
import { BaseImage } from "remix-image";
import dayjs from "dayjs";

import Tags from "~/components/tags";

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  const tags = JSON.parse(post.tags);
  const date = dayjs(post.createdAt).format("MMM DD, YYYY");

  // bg-tag-${tags[0].slug} sm:bg-panel-light sm:dark:bg-panel-dark

  return (
    <article
      className="flex flex-wrap sm:flex-nowrap bg-panel-light dark:bg-panel-dark p-8 rounded-2xl shadow-l dark:shadow-d mb-12"
      key={post.slug}
    >
      <div
        className={`sm:mr-8 mb-8 sm:mb-0   md:w-[250px] md:h-[250px] w-full h-full  rounded-2xl border-solid border-4 border-tag-light dark:border-tag-dark`}
      >
        <Link to={`/${post.slug}`} prefetch="intent">
          <BaseImage
            className="rounded-xl sm:max-w-[250px] sm:max-h-[250px] m-auto "
            loaderUrl="/api/image"
            src={post.image}
          />
        </Link>
      </div>
      <div className="relative">
        <Tags tags={tags} />
        <h2 className="mt-0 mb-5 text-3xl font-semibold leading-4xl text-2xl md:text-3xl">
          <Link to={`/${post.slug}`} prefetch="intent">
            {post.title}
          </Link>
        </h2>
        <div className="mb-4 leading-6">{post.description}</div>
        <div className="text-sm flex text-meta md:absolute md:bottom-0">
          <span className="mr-4">{post.author}</span>
          <time className="mr-4" dateTime="2022-04-24">
            {date}
          </time>
        </div>
      </div>
    </article>
  );
}
