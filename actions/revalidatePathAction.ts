"use server";

import { revalidateTag } from "next/cache";

export default async function revalidatePathAction(route: string) {
  revalidateTag(route);
}
