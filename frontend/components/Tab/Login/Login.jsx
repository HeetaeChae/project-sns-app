import { useRouter } from "next/router";
import { Card, Button, Form, Input } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logInRequest } from "../../../store/modules/user";
import styled from "styled-components";
import axios from "axios";
import { LOG_IN } from "../../../store/modules/user";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 30px;
  border-top: 1px solid rgb(235, 237, 240);
`;

const { Meta } = Card;

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const router = useRouter();

  const onFinish = (data) => {
    axios
      .post("http://localhost:7000/api/user/login", data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.doc);
          dispatch({ type: LOG_IN, payload: res.data.doc });
        } else {
          console.log(res.data);
        }
      });
  };

  return (
    <Card
      style={{
        width: 320,
        marginBottom: 30,
        marginRight: 5,
      }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="이메일"
          name="email"
          rules={[
            {
              required: true,
              message: "이메일 형식이 아닙니다.",
              type: "email",
            },
          ]}
        >
          <Input size="large" placeholder="ex )  sns@gmail.com" />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해주세요.",
            },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <ButtonWrapper>
          <Form.Item>
            <Button onClick={() => router.push("/signup")}>
              <UserAddOutlined key="signup" />
              회원가입
            </Button>
          </Form.Item>
          <Form.Item>
            {user.isLoggingIn ? (
              <Button type="primary" htmlType="submit" loading>
                <LoginOutlined key="login" />
                로그 인
              </Button>
            ) : (
              <Button type="primary" htmlType="submit">
                <LoginOutlined key="login" />
                로그 인
              </Button>
            )}
          </Form.Item>
        </ButtonWrapper>
      </Form>
      <Meta description="SNS-APP에 접속해보세요!" />
    </Card>
  );
};

export default Login;
