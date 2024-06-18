import { atom } from "recoil";

export const searchKeywordState = atom({
  key: "searchKeywordState",
  default: "",
});

export const searchCategoryState = atom({
  key: "searchCategoryState",
  default: "",
});

export const selectPlaceState = atom({
  key: "selectPlaceState",
  default: [],
});
