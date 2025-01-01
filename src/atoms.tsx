import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

const getLocalStorage = (key: string, defaultValue: any): any => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

export const categoriesState = atom<string[]>({
  key: "categoriesState",
  default: getLocalStorage("categoriesState", ["TO_DO", "DOING", "DONE"]),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newCategories) => {
        localStorage.setItem("categoriesState", JSON.stringify(newCategories));
      });
    },
  ],
});

export const categoryState = atom<string>({
  key: "category",
  default: "TO_DO",
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: getLocalStorage("toDoState", []),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});