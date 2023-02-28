import { TodoType } from "../AppContainer";
type propsType = {
  addTodo: (
    uid: string,
    title: string,
    body: string,
    done: boolean,
    sticker: string,
    date: string
  ) => void;
  updateTodo: (todo: TodoType) => void;
  deleteTodo: (todo: TodoType) => void;
};
const Input = (props: propsType) => {
  return <div>Input</div>;
};
export default Input;