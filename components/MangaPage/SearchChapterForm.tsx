"use client";
import { chapterSearchSchema } from "@/zod-schema/schema";
import Form from "../lib/Form";
import FormInput from "../lib/FormInput";
import toast from "react-hot-toast";
import FormButtons from "./FormButtons";
import { Dispatch, SetStateAction, useState } from "react";

const SearchChapterForm = ({
  finalData,
  setFinalData,
}: {
  finalData: string;
  setFinalData: Dispatch<SetStateAction<string>>;
}) => {
  const [chapterToSearch, setChapterToSearch] = useState("");
  const chapterFormClientAction = async (formData: FormData) => {
    const chapterSearched = formData.get("chapter");
    const parsedChapter = chapterSearchSchema.safeParse(chapterSearched);
    if (!parsedChapter.success) {
      let errorMessage = "";
      parsedChapter.error.issues.forEach((issue) => {
        errorMessage += issue.message;
      });
      toast.error(errorMessage.replace("String", "Chapter"));
      return;
    }
    // grab the final data from the client action by setting the finalData variable to that
    setFinalData(parsedChapter.data);
  };

  return (
    <Form
      className="w-11/12 flex-row flex-wrap justify-start gap-2 place-self-start self-start"
      action={chapterFormClientAction}
    >
      <FormInput
        onChange={(e) => {
          setChapterToSearch(e.target.value);
        }}
        type="text"
        value={chapterToSearch}
        name="chapter"
        min={0}
        required
        placeholder="Enter a chapter..."
        className="max-w-72"
      />
      <FormButtons
        finalData={finalData}
        setChapterToSearch={setChapterToSearch}
        setFinalData={setFinalData}
      />
    </Form>
  );
};
export default SearchChapterForm;
