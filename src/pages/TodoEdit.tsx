import * as css from "../style/style";
import { UserOutlined, EditOutlined, UndoOutlined } from "@ant-design/icons";
import { Input, DatePicker, Radio, Button, Space, Form } from "antd";
import moment from "moment";
import { CallBacksType, StatesType, TodoType } from "../AppContainer";
// URI 에 전달된 parameter 활용시
//  :    /edit/uid
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Checkbox from "antd/es/checkbox/Checkbox";

type propsType = {
  states: StatesType;
  callBacks: CallBacksType;
};

const TodoEdit = ({ states, callBacks }: propsType) => {
  const path = process.env.PUBLIC_URL;

  const [form] = Form.useForm();
  // navigate 로 전달된 uid 를 활용
  const { uid } = useParams();
  const navigate = useNavigate();
  // uid 를 이용해서 find 합니다.
  let todoItem = states.todoList.find((item) => item.uid === uid);
  //   console.log("todoItem : ", todoItem);
  // 검색해 둔 아이템을 상태관리한다.
  const [todo, setTodo] = useState({ ...todoItem });

  useEffect(() => {
    if (!todoItem) {
      alert("목록이 없습니다.");
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 내용 입력
  const { TextArea } = Input;
  // 필수 항목 작성시
  const onFinish = (values: any) => {
    const updateTodo: TodoType = {
      uid: String(uid),
      title: values.title,
      body: values.body,
      date: values.date,
      done: values.done,
      sticker: values.sticker,
    };
    console.log(updateTodo);
    // 항목 초기화(테스트)
    // 날짜가 리셋이 안되요.
    // form.resetFields();
    // update 실행한다.
    // 첫화면으로 이동한다.
    callBacks.updateTodo(updateTodo);
    alert("내용이 수정되었습니다.");
    navigate("/");
  };
  // 항목 누락시
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <css.TodoInputWrap style={{ paddingBottom: 20 }}>
      {/* Ant.design Form 이용 */}
      <Form
        name="todoform"
        form={form}
        layout="vertical"
        labelCol={{}}
        wrapperCol={{}}
        style={{ maxWidth: "100%" }}
        initialValues={{
          title: todo.title,
          date: moment(todo.date),
          sticker: todo.sticker,
          body: todo.body,
          done: todo.done,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* 제목 */}
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            size="large"
            placeholder="제목을 입력하세요."
            prefix={<UserOutlined />}
            maxLength={20}
            showCount
          />
        </Form.Item>
        {/* 할일 수행 여부 */}
        <Form.Item name="done" valuePropName="checked">
          <Checkbox>{todo.done ? <>완료</> : <>진행중</>}</Checkbox>
        </Form.Item>
        {/* 날짜 */}
        <Form.Item
          label="날짜"
          name="date"
          rules={[{ required: true, message: "날짜를 입력하세요." }]}
        >
          <DatePicker style={{ width: "100%" }} disabled />
        </Form.Item>
        {/* 스티커 선택 */}
        <Form.Item
          label="Sticker"
          name="sticker"
          rules={[{ required: true, message: "스티커를 선택하세요." }]}
        >
          <Radio.Group>
            <Radio value={"1"}>
              <img
                src={`${path}/icon/icon1.png`}
                alt="날씨"
                style={{ width: 30, height: 30 }}
              />
            </Radio>
            <Radio value={"2"}>
              <img
                src={`${path}/icon/icon2.png`}
                alt="날씨"
                style={{ width: 30, height: 30 }}
              />
            </Radio>
            <Radio value={"3"}>
              <img
                src={`${path}/icon/icon3.png`}
                alt="날씨"
                style={{ width: 30, height: 30 }}
              />
            </Radio>
            <Radio value={"4"}>
              <img
                src={`${path}/icon/icon4.png`}
                alt="날씨"
                style={{ width: 30, height: 30 }}
              />
            </Radio>
          </Radio.Group>
        </Form.Item>
        {/* 내용 */}
        <Form.Item
          label="Contents"
          name="body"
          rules={[{ required: true, message: "내용을 입력하세요." }]}
        >
          <TextArea
            showCount
            maxLength={100}
            style={{ height: 120, resize: "none" }}
            placeholder="할일 입력해 주세요."
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space align="center">
            <Button
              htmlType="button"
              danger
              icon={<UndoOutlined />}
              onClick={() => navigate("/")}
            >
              Back
            </Button>

            <Button htmlType="reset" danger icon={<UndoOutlined />}>
              Reset
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              danger
              icon={<EditOutlined />}
            >
              Update
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </css.TodoInputWrap>
  );
};

export default TodoEdit;