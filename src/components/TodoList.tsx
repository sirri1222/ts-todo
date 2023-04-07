import * as css from "../style/style";
import { List, Modal, Button } from "antd";

import { TodoType } from "../AppContainer";
import TodoListItem from "./TodoListItem";
import { useState } from "react";

type propsType = {
  todoList: Array<TodoType>;
  updateTodo: (todo: TodoType) => void;
  deleteTodo: (todo: TodoType) => void;
  clearTodo?: () => void;
};

const TodoList = ({
  todoList,
  updateTodo,
  deleteTodo,
  clearTodo,
}: propsType) => {
  let items = todoList.map((item) => {
    return (
      <TodoListItem
        key={item.uid}
        todoItem={item}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    );
  });

  // 모달 관련
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("전체 목록을 삭제하시겠습니까?");

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("전체 목록이 삭제되었습니다.");
    // 전체내용 삭제
    // 오류일 수있다.
    clearTodo && clearTodo();

    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <css.TodoListWrap>
      {todoList.length > 0 ? (
        <Button type="primary" danger onClick={showModal}>
          Delete All
        </Button>
      ) : (
        <span>등록된 내용이 없습니다.</span>
      )}
      <List>{items}</List>
      <Modal
        title="Delete All Todos"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </css.TodoListWrap>
  );
};

export default TodoList;