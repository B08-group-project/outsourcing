import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import Example from "../components/example/ExampleComponent";
import textState from "../recoil/atom/characterCount.atom";

function CharacterCounter() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetch("https://api.github.com/repos/TanStack/query").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <TextInput />
      <Example />
      <br />
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong> <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

export default CharacterCounter;
