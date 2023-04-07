import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CallBacksType, StatesType } from "../AppContainer";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";

type propsType = {
  states: StatesType;
  callBacks: CallBacksType;
  userLogin: Boolean;
};
const Todo = ({ states, callBacks, userLogin }: propsType) => {
  // 사용자가 회원가입을 하거나 로그인을 한 상태가 아니라면
  // 로그인 화면으로 이동할 거에요.
  const navigator = useNavigate();

  useEffect(() => {
    if (userLogin === false) {
      // 사용자 로그인 정보가 없으면
      // 로그인으로 이동
      navigator("/login");
    }
  }, [userLogin]);

  return (
    <>
      <TodoInput addTodo={callBacks.addTodo} />
      <TodoList
        todoList={states.todoList}
        updateTodo={callBacks.updateTodo}
        deleteTodo={callBacks.deleteTodo}
        clearTodo={callBacks.clearTodo}
      />
    </>
  );
};

export default Todo;