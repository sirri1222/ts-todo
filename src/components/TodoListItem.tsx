import { useNavigate } from "react-router-dom";
import { Button, List, Space, Modal } from "antd";
import { TodoType } from "../AppContainer";
import { useState } from "react";

type propsType = {
  todoItem: TodoType;
  updateTodo: (todo: TodoType) => void;
  deleteTodo: (todo: TodoType) => void;
};

const TodoListItem = (props: propsType) => {
  const path = process.env.PUBLIC_URL;
  // 웹브라우저 특정 주소로 라우팅
  const navigate = useNavigate();
  // 모달 관련
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("내용을 삭제하시겠습니까?");

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("내용이 삭제되었습니다.");
    // 실제내용 삭제
    props.deleteTodo(props.todoItem);

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

  const lineThrough = {
    textDecoration: "line-through",
  };
  return (
    <>
      <List.Item>
        <Space style={!props.todoItem.done ? lineThrough : {} }>
          {props.todoItem.title}
          {props.todoItem.body}
          {props.todoItem.date}
          {
            <img
              src={`${path}/icon/icon${props.todoItem.sticker}.png`}
              alt="날씨"
              style={{ width: 30, height: 30 }}
            />
          }
        </Space>
        <Space>
          {/* 클릭하면  /edit/아이디    */}
          <Button onClick={() => navigate(`/edit/${props.todoItem.uid}`)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              showModal();
              // props.deleteTodo(props.todoItem);
            }}
          >
            Delete
          </Button>
        </Space>
      </List.Item>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

export default TodoListItem;