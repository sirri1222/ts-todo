import * as css from "../style/style";
import { UserOutlined, EditOutlined, UndoOutlined } from "@ant-design/icons";
import {
  Input,
  DatePicker,
  Radio,
  Button,
  Space,
  Form,
  notification,
} from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";

import moment from "moment";

type propsType = {
  addTodo: (
    uid: string,
    title: string,
    body: string,
    done: boolean,
    sticker: string,
    date: string
  ) => void;
};

const TodoInput = (props: propsType) => {
  const path = process.env.PUBLIC_URL;

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification ${placement}`,
      description: "새로운 내용이 등록 되었습니다.",
      placement,
      duration: 1,
    });
  };

  const [form] = Form.useForm();

  // 내용 입력
  const { TextArea } = Input;

  // 필수 항목 작성시
  const onFinish = (values: any) => {
    openNotification("top");

    let day = moment(values.date).format("YYYY-MM-DD");
    // console.log("Success:", values);
    // 새로운 아이템
    // const todoItem: TodoType = {
    //   uid: String(new Date().getTime()),
    //   title: values.title,
    //   body: values.body,
    //   done: false,
    //   sticker: values.sticker,
    //   date: day,
    // };
    props.addTodo(
      String(new Date().getTime()),
      values.title,
      values.body,
      false,
      values.sticker,
      day
    );
    // 항목 초기화
    form.resetFields();
  };
  // 항목 누락시
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <css.TodoInputWrap>
        {/* Ant.design Form 이용 */}
        <Form
          name="todoform"
          form={form}
          layout="vertical"
          labelCol={{}}
          wrapperCol={{}}
          style={{ maxWidth: "100%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* 제목 */}
          <Form.Item
            label="제목"
            name="제목"
            rules={[{ required: true, message: "제목을 입력하세요!" }]}
          >
            <Input
              size="large"
              placeholder="제목을 입력하세요."
              prefix={<UserOutlined />}
              maxLength={20}
              showCount
            />
          </Form.Item>
          {/* 날짜 */}
          <Form.Item
            label="날짜"
            name="날짜"
            rules={[{ required: true, message: "날짜를 입력하세요." }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          {/* 스티커 선택 */}
          <Form.Item
            label="오늘의 기분은?"
            name="오늘의 기분은?"
            initialValue={"1"}
            rules={[{ required: true, message: "기분을 선택하세요." }]}
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
            label="내용"
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
                htmlType="submit"
               type="text"
                danger
                icon={<EditOutlined />}
              >
                추가하기
              </Button>
              <Button htmlType="reset"   type="text" danger icon={<UndoOutlined />}>
                다시적기
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </css.TodoInputWrap>
    </>
  );
};

export default TodoInput;
