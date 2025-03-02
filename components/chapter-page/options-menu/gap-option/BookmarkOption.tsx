"use client";
import {
  GET_BOOKMARKS_TAG,
  GET_MANGA_BOOKMARKS_TAG,
} from "@/lib/cache-keys/unstable_cache";
import { bookmarkIconColor, clipLoaderColor } from "@/lib/constants";
import BasicButton from "@/components/lib/BasicButton";
import { ClipLoader } from "react-spinners";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { GET_BOOKMARK_SWR_KEY } from "@/lib/cache-keys/swr";
import Link from "next/link";
import OptionInputTitle from "@/components/lib/OptionInputTitle";
import OptionLi from "@/components/lib/OptionLi";
import SquaredIcon from "@/components/lib/SquaredIcon";
import SquaredIconButton from "@/components/lib/SquaredIconButton";
import addBookmarkAction from "@/actions/bookmark/addBookmarkAction";
import deleteBookmarkAction from "@/actions/bookmark/deleteBookmarkAction";
import revalidateTagAction from "@/actions/revalidateTagAction";
import toast from "react-hot-toast";
import useMutateBookmark from "@/hooks/useMutateBookmark";
import { useParams } from "next/navigation";
import { useState } from "react";
import useUser from "@/hooks/auth/useUser";

const BookmarkOption = ({
  image,
  name,
  mangaSlug,
  currentChapterTitle,
}: {
  image: string;
  name: string;
  mangaSlug: string;
  currentChapterTitle: string;
}) => {
  const { user } = useUser();
  const { chapterSlug }: { chapterSlug: string } = useParams();
  const { bookmark, mutate, toastOptions } = useMutateBookmark(
    chapterSlug,
    mangaSlug,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async () => {
    setIsSubmitting(true);
    try {
      if (!user) {
        toast.error(
          <div className="flex gap-2">
            <p>You need to be logged in to bookmark a chapter</p>
            <BasicButton className="group p-0" role="link">
              <Link
                href={"/login"}
                className="size-full px-4 py-2 group-hover:underline"
              >
                Login
              </Link>
            </BasicButton>
          </div>,
          toastOptions,
        );
        return;
      }

      if (bookmark) {
        const { id } = bookmark;
        const error = await deleteBookmarkAction({ id });
        if (error) {
          toast.error(error, toastOptions);
          return;
        }
      } else {
        const error = await addBookmarkAction({
          chapterSlug,
          mangaName: name,
          mangaSlug: mangaSlug,
          image,
          chapterTitle: currentChapterTitle,
        });
        if (error) {
          toast.error(error, toastOptions);
          return;
        }
      }

      // Only mutate and revalidate if the action was successful
      mutate(
        `${GET_BOOKMARK_SWR_KEY}?chapterSlug=${chapterSlug}&mangaSlug=${mangaSlug}`,
      );
      revalidateTagAction(GET_BOOKMARKS_TAG);
      revalidateTagAction(GET_MANGA_BOOKMARKS_TAG);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      toast.error(
        "An unexpected error occurred. Please try again.",
        toastOptions,
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <OptionLi>
      <OptionInputTitle className="min-w-56">
        {bookmark ? "Bookmarked" : "Bookmark this chapter:"}
      </OptionInputTitle>
      <SquaredIconButton onClick={handleClick} disabled={isSubmitting}>
        <SquaredIcon
          icon={bookmark ? FaBookmark : FaRegBookmark}
          fill={bookmarkIconColor}
        />
      </SquaredIconButton>
      {isSubmitting && <ClipLoader color={clipLoaderColor} size={22} />}
    </OptionLi>
  );
};

export default BookmarkOption;
