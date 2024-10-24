import {
  ChapterPagesDisposition,
  DashBoardSubNavLinksName,
  DashBoardSubNavLinksSearchParam,
  FormInput,
  GapOption,
  ProgressBarDirection,
  ReadingDirection,
} from "@/zod-schema/schema";
import { CiDesktop, CiLight } from "react-icons/ci";
import { BsFire } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";

export const gapOptions: GapOption[] = [
  { name: "No gap", value: "0rem" },
  { name: "Small", value: "0.5rem" },
  { name: "Medium", value: "1rem" },
  { name: "Large", value: "3rem" },
];

export const themeOptions = [
  { themeName: "Light", Icon: CiLight },
  { themeName: "Dark", Icon: MdDarkMode },
  { themeName: "System", Icon: CiDesktop },
];
export const WINDOW_RESIZE_RATIO = 55 / 72;

export const arrayOfDirections: {
  content: ReadingDirection;
  id: string;
  value: ReadingDirection;
}[] = [
  {
    content: "From left to right",
    id: "fromLeftToRight",
    value: "From left to right",
  },
  {
    content: "From right to left",
    id: "fromRightToLeft",
    value: "From right to left",
  },
];

export const pagesDispositions: {
  content: ChapterPagesDisposition;
  id: string;
  value: ChapterPagesDisposition;
}[] = [
  { content: "Long Strip", id: "longStrip", value: "Long Strip" },
  { content: "Single Page", id: "singlePage", value: "Single Page" },
];

export const arrayOfPBDirections: {
  content: ProgressBarDirection;
  id: string;
  value: ProgressBarDirection;
}[] = [
  { content: "Horizontal", id: "horizontal", value: "Horizontal" },
  { content: "Vertical", id: "vertical", value: "Vertical" },
];

export const SYNOPSIS_LENGTH = 621;

export const alphabet: string[] = [..."#ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

export const links = [
  { name: "Home", path: "/", width: "w-3/12", Icon: IoMdHome },
  {
    name: "Popular",
    path: "/popular",
    width: "w-4/12",
    Icon: BsFire,
  },
  {
    name: "List",
    path: "/list/numbers",
    width: "w-3/12",
    Icon: FaClipboardList,
  },
];

export const MAIN_URL = "https://mangasee123.com";

export const NUMBER_TO_FETCH_ON_POPULAR_PAGE = 55;

export const TITLE_LENGTH_LARGE_POPULAR_MANGA = 30;

export const CHAPTERS_TO_DISPLAY = 20;

export const MAIN_MANGA_ELEMENT_TITLE_LENGTH = 45;

export const dashBoardSubNavLinks: {
  name: DashBoardSubNavLinksName;
  searchParam?: DashBoardSubNavLinksSearchParam;
}[] = [
  { name: "Overview" },
  { name: "History", searchParam: "history" },
  { name: "Bookmarks", searchParam: "bookmarks" },
];

export const MAX_WINDOW_DASHBOARD = 500;
export const SQUARED_BUTTON_WIDTH = 40;

const emailField: FormInput<"email"> = {
  name: "email",
  type: "email",
  placeholder: "Email",
};
const usernameField: FormInput<"username"> = {
  name: "username",
  type: "text",
  placeholder: "Username",
};
const passwordField: FormInput<"password"> = {
  name: "password",
  type: "password",
  placeholder: "Password",
};
const confirmPasswordField: FormInput<"confirmPassword"> = {
  name: "confirmPassword",
  type: "password",
  placeholder: "confirmPassword",
};

export const registerFormFields = [
  emailField,
  usernameField,
  passwordField,
  confirmPasswordField,
];
export const loginFormFields = [usernameField, passwordField];

export const updateBasicInfoFormFields = [usernameField, emailField];

export const updatePasswordFormFields = [passwordField, confirmPasswordField];

export const getUserSelectClause = {
  select: {
    username: true,
    email: true,
    avatarHueValue: true,
    avatarIconPath: true,
    uploadedAvatarUrl: true,
  },
};

export const saltRounds = 10;

export const HISTORY_LOCALSTORAGE_KEY = "userReadingHistory";

export const clipLoaderColor = "#b91c1c";

export const bookmarkIconColor = clipLoaderColor;

export const imagesArrayLength = 18;

export const imagesNames = Array(imagesArrayLength)
  .fill(0)
  .map((_, i) => `/assets/avatars/one-piece/op${i + 1}.svg`);

export const initialIsVisibleImagesArray = new Array(10).fill(false);

export const scrollToTopOffset = 200;
