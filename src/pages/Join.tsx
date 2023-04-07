import React, { useEffect, useState } from "react";

import { Button, Checkbox, Form, Input, Space, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { CallBacksFireBaseType } from "../AppContainer";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
type PropsType = {
  callBacksFireBase: CallBacksFireBaseType;
  userLogin: Boolean;
};
// css 코드는 App.css 넣어둠.
const Join = ({ callBacksFireBase, userLogin }: PropsType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  // 웹브라우저 내용 갱신
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // firebase 로 회원가입에 필요한 정보 전송
    console.log("Received values of form: ", values);
    callBacksFireBase.fbJoin(values.email, values.password);
    // 회원가입 성공 > login 창으로 이동
    showModal();
  };

  useEffect(() => {
    if (userLogin) {
      navigate("/");
    }
  }, [userLogin]);

  return (
    <div style={{ paddingBottom: 20, minHeight: 300 }}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{}}
        style={{ maxWidth: "95%" }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Space>
            {/* 회원가입 데이터 전송 */}
            <Button type="primary" htmlType="submit">
              Register
            </Button>

            {/* 로그인 창으로 이동 */}
            <Button
              type="primary"
              htmlType="button"
              onClick={() => navigate("/login")}
            >
              Member Login
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            확인
          </Button>,
        ]}
      >
        <p>회원가입이 되었습니다. 로그인창으로 이동합니다.</p>
      </Modal>
    </div>
  );
};

export default Join;