import { Fragment, HTMLInputTypeAttribute, act } from "react";
import { describe, expect, it, test } from "vitest";
import { fireEvent, render, renderHook, waitFor } from "@testing-library/react";
import EyeIcon from "@/components/lib/EyeIcon";
import useEyeIcon from "@/hooks/useEyeIcon";

const inputData: { name: string; type: HTMLInputTypeAttribute }[] = [
  {
    name: "password",
    type: "password",
  },
  {
    name: "text",
    type: "text",
  },
];
const TestComponent = () => {
  const { getFieldType, toggleVisibility, visibility } = useEyeIcon();
  return (
    <form>
      {inputData.map(({ name, type }) => (
        <Fragment key={name}>
          <input type={getFieldType(name, type)} data-testid={name} />
          {type === "password" && (
            <EyeIcon
              name={name}
              toggleVisibility={toggleVisibility}
              visibility={visibility}
              role={`${name}-eyeIcon`}
            />
          )}
        </Fragment>
      ))}
    </form>
  );
};

describe("useEyeIcon", () => {
  it("should return an object with the functions toggleVisibility, getFieldType and the visibility state", () => {
    const { result, unmount } = renderHook(() => useEyeIcon());

    expect(result.current.visibility).toStrictEqual({});
    unmount();
  });

  test("the getFieldType function", () => {
    const { unmount, getByTestId } = render(<TestComponent />);
    const inputField = getByTestId("password") as HTMLInputElement;
    const textField = getByTestId("text") as HTMLInputElement;

    expect(textField.type).toBe("text");
    expect(inputField.type).toBe("password");
    unmount();
  });

  test("the toggleVisibility and getFieldType functions together", () => {
    const { unmount, getByTestId, getByRole } = render(<TestComponent />);

    const inputField = getByTestId("password") as HTMLInputElement;
    const inputFieldEyeIcon = getByRole("password-eyeIcon");

    expect(inputField.type).toBe("password");

    act(() => {
      fireEvent.click(inputFieldEyeIcon);
    });

    waitFor(() => {
      expect(inputField.type).toBe("text");
    });

    act(() => {
      fireEvent.click(inputFieldEyeIcon);
    });

    waitFor(() => {
      expect(inputField.type).toBe("password");
    });

    unmount();
  });
});
