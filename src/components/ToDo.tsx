import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, toDoState, categoriesState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];

    });
  };
  return (
    <li>
      <span>{text}</span>
      {categories
        .filter((cat) => cat !== category) // 현재 카테고리를 제외한 버튼만 표시
        .map((cat) => (
          <button key={cat} name={cat} onClick={onClick}>
            {cat}
          </button>
        ))}
    </li>
  );
}
export default ToDo;