import { atom, useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { categoriesState, categoryState, toDoSelector } from "../atoms";
import React, { useEffect } from "react";

interface IForm {
  toDo: string;
}
interface IToDo {
  text: string;
  id: number;
  category: string;
}
const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [newCategory, setNewCategory] = React.useState("");
  const [toDoList, setToDos] = useRecoilState(toDoState);

  useEffect(() => {
    const savedToDos = localStorage.getItem("toDoState");
    const savedCategories = localStorage.getItem("categoriesState");

    if (savedToDos) {
      setCategories(JSON.parse(savedCategories || '["TO_DO", "DOING", "DONE"]'));
      setToDos(JSON.parse(savedToDos));
    }
  }, [setCategories, setToDos]);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories((oldCategories) => [...oldCategories, newCategory]);
      setNewCategory("");
    }
  };
  // console.log(toDos);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <div>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category"
        />
        <button onClick={addCategory}>Add Category</button>
      </div>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;