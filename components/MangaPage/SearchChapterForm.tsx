"use client";
import { ChapterSearchForm, chapterSearchSchema } from "@/zod-schema/schema";
import Form from "../lib/Form";
import FormInput from "../lib/FormInput";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitFormButton from "../lib/SubmitFormButton";
import CloseButton from "../lib/CloseButton";

const SearchChapterForm = ({
  finalData,
  setFinalData,
}: {
  finalData: string;
  setFinalData: Dispatch<SetStateAction<string>>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ChapterSearchForm>({
    resolver: zodResolver(chapterSearchSchema),
  });
  const clientAction = async (data: ChapterSearchForm) => {
    const parsedData = chapterSearchSchema.safeParse(data);
    if (!parsedData.success) {
      let errorMessage = "";
      parsedData.error.issues.forEach((issue) => {
        errorMessage += issue.message;
      });
      toast.error(errorMessage.replace("String", "Chapter"));
      return;
    }
    // grab the final data from the client action by setting the finalData variable to that
    setFinalData(parsedData.data.name.trim());
  };

  return (
    <Form
      className="w-11/12 flex-row flex-wrap justify-start gap-2 place-self-start self-start"
      onSubmit={handleSubmit(clientAction)}
    >
      <FormInput
        type="text"
        required
        placeholder="Enter a chapter..."
        className="max-w-72"
        {...register("name")}
      />
      <div className="flex gap-2">
        {/* Submit button */}
        <SubmitFormButton
          disabled={isSubmitting}
          aria-label="search chapter button"
        >
          Search
        </SubmitFormButton>
        {finalData !== "" ? (
          // cancel search button
          <CloseButton
            title="Cancel search"
            className="rounded-full"
            onClick={() => {
              setFinalData("");
              reset();
            }}
            disabled={isSubmitting}
          />
        ) : (
          <></>
        )}
      </div>
    </Form>
  );
};
export default SearchChapterForm;
