import { Button, Form, Input, PageHeader } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import styled from "styled-components";

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const validateMessages = {
  required: "${label}은(는) 필수 입니다",
  types: {
    email: "${label} 이메일이 유효하지 않습니다",
  },
};

const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: relative;
  padding: 150px 0;
`;
const PageHeaderStyle = styled(PageHeader)`
  border: 1px solid rgb(235, 237, 240);
  position: absolute;
  width: 100%;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Signup = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <FormWrapper>
      <PageHeaderStyle title="회원가입" top="0" />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        style={{ width: "50%", height: "100%" }}
        scrollToFirstError="true"
        size="large"
      >
        <Form.Item
          colon="false"
          hasFeedback="true"
          name={["user", "email"]}
          label="이메일"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "nickname"]}
          label="닉네임"
          rules={[
            {
              required: true,
              type: "name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          label="비밀번호"
          rules={[
            {
              required: true,
              type: "password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          label="비밀번호 확인"
          rules={[
            {
              required: true,
              type: "password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name={["user", "introduction"]} label="짧은 자기소개">
          <Input.TextArea />
        </Form.Item>
      </Form>
      <PageHeaderStyle bottom="0">
        <Button type="primary" htmlType="submit" size="large">
          <UserAddOutlined />
          등록
        </Button>
      </PageHeaderStyle>
    </FormWrapper>
  );
};

export default Signup;
