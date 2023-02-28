import * as css from "./style/style";
import { FormOutlined } from "@ant-design/icons";
import { TodoType } from "./AppContainer";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
type propsType = {
  todoList: Array<TodoType>;
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
  sortTodo: (sortType: string) => void;
};
function App(props: propsType) {
  return (
    <css.Wrapper className="wrap">
      <css.Inner className="inner">
        <css.AppTitle>
          <FormOutlined />
          TodoList App
        </css.AppTitle>
      </css.Inner>
      <TodoInput addTodo={props.addTodo} />
      <TodoList
        todoList={props.todoList}
        updateTodo={props.updateTodo}
        deleteTodo={props.deleteTodo}
      />
    </css.Wrapper>
  );
}

export default App;
