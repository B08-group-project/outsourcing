import { useRecoilValue } from "recoil";
import charCountState from "../../recoil/atom/characterCount.atom";

function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}

export default CharacterCount;
