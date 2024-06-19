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

export const searchData = atom({
  key: "searchData",
  default: [],
});

export const clickedPlaceState = atom({
  key: "clickedPlaceState",
  default: null,
});
