import * as css from "../style/style";
import { List } from "antd";

import { TodoType } from "../AppContainer";
import TodoListItem from "./TodoListItem";

type propsType = {
  todoList: Array<TodoType>;
  updateTodo: (todo: TodoType) => void;
  deleteTodo: (todo: TodoType) => void;
};

const TodoList = (props: propsType) => {
  let items = props.todoList.map((item) => {
    return (
      <TodoListItem
        key={item.uid}
        todoItem={item}
        updateTodo={props.updateTodo}
        deleteTodo={props.deleteTodo}
      />
    );
  });
  return (
    <css.TodoListWrap>
      <List>{items}</List>
    </css.TodoListWrap>
  );
};

export default TodoList;
