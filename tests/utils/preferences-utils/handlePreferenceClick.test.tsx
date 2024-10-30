import {
  PartialUser,
  PreferencesNames,
  PreferencesState,
  PreferencesValues,
  chapterPagesDispositionValues,
  gapOptionNameValues,
} from "@/zod-schema/schema";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import handlePreferenceClick from "@/utils/preferences-utils/handlePreferenceClick";
import preferenceAction from "@/actions/preferences-actions/preferenceAction";
import toast from "react-hot-toast";
import { useSWRConfig } from "swr";
import useStore from "@/hooks/zustand/store";

vi.mock("server-only", () => ({}));
vi.mock("../../../actions/preferences-actions/preferenceAction");
vi.mock("react-hot-toast");
const mockedMutate = vi.fn();
vi.mock("swr", () => {
  const actual = vi.importActual("swr");
  return {
    ...actual,
    useSWRConfig: () => ({
      mutate: mockedMutate,
    }),
  };
});

const TestComponent = <
  T extends PreferencesValues,
  V extends PreferencesState,
  U extends PreferencesNames,
>({
  setState,
  content,
  user,
  field,
  schemaSource,
}: {
  /* eslint-disable no-unused-vars */
  setState: (newState: V) => void;
  content: V;
  user: PartialUser | null | undefined;
  field: U;
  schemaSource?: readonly [T, ...T[]];
}) => {
  const { mutate } = useSWRConfig();

  return (
    <div
      style={{ width: 300, height: 300 }}
      data-testid="div-element"
      onClick={async () => {
        await handlePreferenceClick(
          setState,
          content,
          user,
          {
            style: {
              background: "rgb(15,15, 15)",
              color: "#ffffff",
            },
          },
          mutate,
          field,
          schemaSource,
        );
      }}
    />
  );
};
const initialState = useStore.getState();

describe("handlePreferenceClick", () => {
  const mockedPreferenceAction = vi.mocked(preferenceAction);
  const mockedToast = vi.mocked(toast.error);

  beforeEach(() => {
    useStore.setState(initialState);
    vi.clearAllMocks();
  });

  it("should simply change the state on the client and not call the server action because there is no user", async () => {
    const setChapterPagesDisposition =
      useStore.getState().setChapterPagesDisposition;

    const { unmount, getByTestId } = render(
      <TestComponent
        content="Single Page"
        field="chapterPagesDisposition"
        setState={setChapterPagesDisposition}
        user={null}
        schemaSource={chapterPagesDispositionValues}
      />,
    );
    const div = getByTestId("div-element");
    fireEvent.click(div);

    await waitFor(() => {
      const chapterPagesDisposition =
        useStore.getState().chapterPagesDisposition;
      expect(chapterPagesDisposition).toBe("Single Page");
      expect(mockedPreferenceAction).not.toHaveBeenCalled();
    });

    unmount();
  });

  it("should return nothing because the server action returned an error", async () => {
    mockedPreferenceAction.mockResolvedValue("Error");

    const setChapterPagesDisposition =
      useStore.getState().setChapterPagesDisposition;

    const { unmount, getByTestId } = render(
      <TestComponent
        content="Single Page"
        field="chapterPagesDisposition"
        setState={setChapterPagesDisposition}
        user={{
          username: "Karl",
          email: "karl@gmail.com",
          avatarHueValue: 123,
          avatarIconPath: "path",
          uploadedAvatarUrl: "url",
        }}
        schemaSource={chapterPagesDispositionValues}
      />,
    );
    const div = getByTestId("div-element");
    fireEvent.click(div);

    await waitFor(() => {
      const chapterPagesDisposition =
        useStore.getState().chapterPagesDisposition;
      expect(chapterPagesDisposition).toBe("Single Page");
      expect(mockedPreferenceAction).toHaveBeenCalled();
      expect(mockedToast).toHaveBeenCalled();
      expect(mockedMutate).not.toHaveBeenCalled();
    });

    unmount();
  });

  it("should return call the server action and the mutate function", async () => {
    mockedPreferenceAction.mockResolvedValue(undefined);

    const setChapterPagesDisposition =
      useStore.getState().setChapterPagesDisposition;

    const { unmount, getByTestId } = render(
      <TestComponent
        content="Single Page"
        field="chapterPagesDisposition"
        setState={setChapterPagesDisposition}
        user={{
          username: "Karl",
          email: "karl@gmail.com",
          avatarHueValue: 123,
          avatarIconPath: "path",
          uploadedAvatarUrl: "url",
        }}
        schemaSource={chapterPagesDispositionValues}
      />,
    );
    const div = getByTestId("div-element");
    fireEvent.click(div);

    await waitFor(() => {
      const chapterPagesDisposition =
        useStore.getState().chapterPagesDisposition;
      expect(chapterPagesDisposition).toBe("Single Page");
      expect(mockedPreferenceAction).toHaveBeenCalled();
      expect(mockedMutate).toHaveBeenCalled();
    });

    unmount();
  });

  it("should return call the server action and the mutate function", async () => {
    mockedPreferenceAction.mockResolvedValue(undefined);

    const setGapOption = useStore.getState().setGapOption;

    const { unmount, getByTestId } = render(
      <TestComponent
        content={{ name: "Medium", value: "1rem" }}
        field="gapOptionName"
        setState={setGapOption}
        user={{
          username: "Karl",
          email: "karl@gmail.com",
          avatarHueValue: 123,
          avatarIconPath: "path",
          uploadedAvatarUrl: "url",
        }}
        schemaSource={gapOptionNameValues}
      />,
    );
    const div = getByTestId("div-element");
    fireEvent.click(div);

    await waitFor(() => {
      const gapOption = useStore.getState().gapOption;
      expect(gapOption.name).toBe("Medium");
      expect(mockedPreferenceAction).toHaveBeenCalled();
      expect(mockedMutate).toHaveBeenCalled();
    });

    unmount();
  });
});
