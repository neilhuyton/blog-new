import { useEffect, useState } from "react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import invariant from "tiny-invariant";
import { BaseImage } from "remix-image";
import dayjs from "dayjs";

import Tags from "~/components/tags";
import Dialog from "~/components/dialog";
import { getPost } from "~/models/post.server";

marked.setOptions({
  highlight: function (code: string, lang: string) {
    const hljs = require("highlight.js/lib/common");
    const language: string = hljs.getLanguage(lang) ? lang : "plaintext";

    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-",
});

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  const html = marked(post.markdown);
  return json({ post, html });
};

export default function PostSlug() {
  const { post, html } = useLoaderData<typeof loader>();
  const tags = JSON.parse(post.tags);
  const date = dayjs(post.createdAt).format("MMM DD, YYYY");

  const [dialogImage, setDialogImage] = useState('');
  const [altText, setAltText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const initLightBox = () => {
    const elements = document.querySelectorAll<HTMLLinkElement>('.lightbox');
    if (!elements) return;
  
    Array.from(elements).forEach(element => {
      element.addEventListener('click', function (e) {
        e.preventDefault();
  
        setIsOpen(true);
        setDialogImage(element.href);
        setAltText(element.title);
      })
    })
  }

  const clickHandler = () => {
    setIsOpen(false);
    setDialogImage('');
    setAltText('');
  }

  useEffect(() => {
    initLightBox();
  }, [])

  return (
    <>
      <article className="bg-panel-light dark:bg-panel-dark shadow-l dark:shadow-d p-8 rounded-2xl">
        {/* bg-tag-react bg-tag-remix bg-tag-freedombox */}
        <figure
          className={`w-full mt-0 mb-8 mx-0 text-center rounded-2xl border-solid border-4 border-tag-light dark:border-tag-dark`}
        >
          <BaseImage
            className="h-full rounded-2xl mx-auto"
            loaderUrl="/api/image"
            src={post.image}
          />
        </figure>
        <header className="max-w-screen-md lg:px-8 mt-0 mb-16 mx-auto">
          <Tags tags={tags} />
          <h1 className="mt-0 mb-5 text-4xl font-semibold leading-4xl">
            {post.title}
          </h1>
          <div className="text-sm flex text-meta">
            <span className="mr-4">{post.author}</span>
            <time className="mr-4" dateTime="2022-04-24">
              {date}
            </time>
          </div>
        </header>
        <div className="max-w-screen-md lg:px-8 my-0 mx-auto">
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </article>
      <Dialog onClick={clickHandler} isOpen={isOpen}><img src={dialogImage} alt={altText} /></Dialog>
    </>
  );
}
