import { selector } from "recoil";
import textState from "../atom/characterCount.atom";

const charCountState = selector({
  key: "charCountState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);
    return text.length;
  },
});

export default charCountState;
