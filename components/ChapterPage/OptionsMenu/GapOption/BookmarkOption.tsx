"use client";
import BasicButton from "@/components/lib/BasicButton";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { GET_BOOKMARK_SWR_KEY } from "@/lib/constants";
import Link from "next/link";
import OptionInputTitle from "@/components/lib/OptionInputTitle";
import OptionLi from "@/components/lib/OptionLi";
import SquaredIcon from "@/components/lib/SquaredIcon";
import SquaredIconButton from "@/components/lib/SquaredIconButton";
import addBookmarkAction from "@/actions/bookmark/addBookmarkAction";
import deleteBookmarkAction from "@/actions/bookmark/deleteBookmarkAction";
import toast from "react-hot-toast";
import useMutateBookmark from "@/hooks/useMutateBookmark";
import { useParams } from "next/navigation";
import { useState } from "react";
import useUser from "@/hooks/Auth/useUser";

const BookmarkOption = ({ image }: { image: string }) => {
  const { user } = useUser();
  const { altTitle, chapterSlug }: { altTitle: string; chapterSlug: string } =
    useParams();
  const { bookmark, mutate, toastOptions } = useMutateBookmark(
    chapterSlug,
    altTitle,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async () => {
    setIsSubmitting(true);
    if (bookmark) {
      const { id } = bookmark;
      const error = await deleteBookmarkAction({ id });
      if (error) {
        toast.error(error, toastOptions);
      }
      mutate(
        `${GET_BOOKMARK_SWR_KEY}?chapterSlug=${chapterSlug}&mangaName=${altTitle}`,
      );
      setIsSubmitting(false);
      return;
    }
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
      setIsSubmitting(false);
      return;
    }
    const error = await addBookmarkAction({
      chapterSlug,
      mangaName: altTitle,
      image,
    });
    if (error) {
      toast.error(error, toastOptions);
      setIsSubmitting(false);
      return;
    }
    // revalidate bookmark to get the newest data
    mutate(
      `${GET_BOOKMARK_SWR_KEY}?chapterSlug=${chapterSlug}&mangaName=${altTitle}`,
    );
    setIsSubmitting(false);
  };

  return (
    <OptionLi>
      <OptionInputTitle>Bookmark this chapter:</OptionInputTitle>
      <SquaredIconButton onClick={handleClick} disabled={isSubmitting}>
        <SquaredIcon icon={bookmark ? FaBookmark : FaRegBookmark} fill="red" />
      </SquaredIconButton>
    </OptionLi>
  );
};
export default BookmarkOption;
