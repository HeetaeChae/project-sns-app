import { Avatar, Card, Button, Form, Input } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Card
      style={{
        width: 250,
        marginBottom: 30,
        marginRight: 5,
      }}
      actions={[
        <Button>
          <UserAddOutlined key="signup" />
          회원가입
        </Button>,
        <Button type="primary">
          <LoginOutlined key="login" />
          로그 인
        </Button>,
      ]}
    >
      <Form
        name="basic"
        labelCol={{
          span: 9,
        }}
        wrapperCol={{
          span: 15,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="이메일"
          name="email"
          rules={[
            {
              required: true,
              message: "이메일 필수입력",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호 필수입력",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
      <Meta title="인증방식 JWT" description="SNS-APP에 접속해보세요!" />
    </Card>
  );
};

export default Login;
