"use server";

import { revalidateTag } from "next/cache";

export default async function revalidateTagAction(tag: string) {
  revalidateTag(tag);
}
