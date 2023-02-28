import * as css from "../style/style";
import { UserOutlined, EditOutlined, UndoOutlined } from "@ant-design/icons";
import {
  Input,
  DatePicker,
  Radio,
  Button,
  Divider,
  Space,
  Row,
  Tooltip,
} from "antd";
import type { DatePickerProps } from "antd";
import type { RadioChangeEvent } from "antd";

import { TodoType } from "../AppContainer";
import { useState } from "react";

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
  // 날짜
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };
  // 스티커
  const [stickerValue, setStickerValue] = useState<string>("1");
  const onChangeSticker = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setStickerValue(e.target.value);
  };
  // 내용 입력
  const { TextArea } = Input;
  const onChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("Change:", e.target.value);
  };

  return (
    <css.TodoInputWrap>
      <Divider orientation="left">제목</Divider>
      <Tooltip title="제목입력" placement="topRight">
        <Input
          size="large"
          placeholder="제목을 입력하세요."
          prefix={<UserOutlined />}
        />
      </Tooltip>
      <Divider orientation="left">날짜</Divider>
      <DatePicker onChange={onChangeDate} style={{ width: "100%" }} />
      <Divider orientation="left">스티커</Divider>
      <Radio.Group onChange={onChangeSticker} value={stickerValue}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
      <Divider orientation="left">내용</Divider>
      <TextArea
        showCount
        maxLength={100}
        style={{ height: 120, resize: "none" }}
        onChange={onChangeBody}
        placeholder="disable resize"
      />
      <Divider />
      <Row justify="center">
        <Space align="center">
          <Button danger icon={<UndoOutlined />}>
            Cancel
          </Button>

          <Button type="primary" danger icon={<EditOutlined />}>
            Add
          </Button>
        </Space>
      </Row>
    </css.TodoInputWrap>
  );
};

export default TodoInput;
