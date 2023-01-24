import type { Post } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getPosts() {
  return prisma.post.findMany();
}

export async function getPostsByTag(tag: string) {
  return prisma.post.findMany({
    where: {
      tags: {
        contains: tag,
      },
    },
  });
}

export async function getFeaturedPosts() {
  return prisma.post.findMany({
    where: { isFeatured: true },
  });
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug } });
}

export async function createPost(
  post: Pick<Post, "slug" | "title" | "markdown" | "description">
) {
  return prisma.post.create({ data: post });
}
