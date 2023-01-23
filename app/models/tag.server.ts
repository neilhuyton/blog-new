import { prisma } from "~/db.server";

export async function getTags() {
  return prisma.tag.findMany();
}
