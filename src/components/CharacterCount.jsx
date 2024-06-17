import { useRecoilValue } from "recoil";
import charCountState from "../recoil/selector/characterCount.selector";

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}

export default CharacterCount;
