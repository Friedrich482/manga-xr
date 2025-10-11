"use client";
import { Dispatch, SetStateAction } from "react";
import { MangaSearchForm, mangaSearchFormSchema } from "@/zod-schema/schema";
import CloseButton from "@/components/lib/CloseButton";
import Form from "@/components/lib/Form";
import FormInput from "@/components/lib/FormInput";
import SubmitFormButton from "@/components/lib/SubmitFormButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SearchMangaInHistoryForm = ({
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
  } = useForm<MangaSearchForm>({
    resolver: zodResolver(mangaSearchFormSchema),
  });
  const processSearchMangaForm = async (data: unknown) => {
    const parsedData = mangaSearchFormSchema.safeParse(data);
    if (!parsedData.success) {
      let errorMessage = "";
      parsedData.error.issues.forEach((issue) => {
        errorMessage += issue.message;
      });
      return errorMessage;
    }
    setFinalData(parsedData.data.name);
  };
  return (
    <Form
      onSubmit={handleSubmit(processSearchMangaForm)}
      className="w-full flex-row flex-wrap gap-4"
    >
      <FormInput
        type="text"
        required
        placeholder="Enter a manga..."
        className="max-w-72"
        {...register("name")}
      />
      <div className="flex min-w-44 gap-2">
        {/* Submit button */}
        <SubmitFormButton
          disabled={isSubmitting}
          aria-label="search manga button"
          className="w-32 shrink-0"
        >
          Search
        </SubmitFormButton>
        {finalData !== "" && (
          // cancel search button
          <CloseButton
            title="Cancel search"
            className="shrink-0 self-center rounded-full"
            onClick={() => {
              setFinalData("");
              reset();
            }}
            disabled={isSubmitting}
          />
        )}
      </div>
    </Form>
  );
};
export default SearchMangaInHistoryForm;
