import React, { useState, useCallback } from "react";
import router from "next/router";
import { Button, Form, Input, PageHeader, Modal } from "antd";
import {
  UserAddOutlined,
  CheckCircleTwoTone,
  SmileOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import axios from "axios";
import day from "../hook/day";

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: relative;
  padding-top: 80px;
  border: 1px solid rgb(235, 237, 240);
`;
const FormStyle = styled(Form)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const FormItemStyle = styled(Form.Item)`
  width: 50%;
  text-align: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 10px 0;
`;
const PageHeaderStyle = styled(PageHeader)`
  border-bottom: 1px solid rgb(235, 237, 240);
  position: absolute;
  width: 100%;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Signup = () => {
  const [nickname, setNickname] = useState("");
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const handleOk = useCallback(() => {
    setIsSuccessModal(false);
    setNickname("");
    router.push("/");
  }, [isSuccessModal]);
  const handleCancel = useCallback(() => {
    setIsSuccessModal(false);
    setNickname("");
    router.push("/");
  }, [isSuccessModal]);

  const passwordCheckModal = () => {
    Modal.error({
      content: "비밀번호가 다릅니다.",
      centered: true,
    });
  };
  const emailCheckModal = () => {
    Modal.error({
      content: "이미 존재하는 이메일입니다.",
      centered: true,
    });
  };

  const onFinish = (data) => {
    data.date = day();
    if (data.password !== data.passwordCheck) {
      return passwordCheckModal();
    }
    axios.post("http://localhost:7000/api/user/signup", data).then((res) => {
      if (res.data.success) {
        setNickname(res.data.doc.nickname);
        setIsSuccessModal(true);
      } else {
        emailCheckModal();
      }
    });
  };

  return (
    <FormWrapper>
      <PageHeaderStyle title="회원가입" top="0" />
      <FormStyle
        {...layout}
        onFinish={onFinish}
        scrollToFirstError="true"
        initialValues={{ remember: true }}
        size="large"
        autoComplete="on"
      >
        <FormItemStyle
          colon="false"
          hasFeedback="true"
          name="email"
          label="이메일"
          rules={[
            {
              required: true,
              type: "email",
              message: "이메일을 입력해주세요.",
            },
          ]}
        >
          <Input />
        </FormItemStyle>
        <FormItemStyle
          name="nickname"
          label="닉네임"
          rules={[
            {
              required: true,
              message: "닉네임을 입력해주세요.",
            },
          ]}
        >
          <Input />
        </FormItemStyle>
        <FormItemStyle
          name="password"
          label="비밀번호"
          rules={[
            {
              required: true,
              message: "비밀번호를 입력해주세요.",
            },
          ]}
        >
          <Input.Password />
        </FormItemStyle>
        <FormItemStyle
          name="passwordCheck"
          label="비밀번호 확인"
          rules={[
            {
              required: true,
              message: "비밀번호 확인을 입력해주세요.",
            },
          ]}
        >
          <Input.Password />
        </FormItemStyle>
        <FormItemStyle name="introduction" label="짧은 자기소개">
          <Input.TextArea />
        </FormItemStyle>
        <ButtonWrapper>
          <Button type="primary" htmlType="submit" size="large">
            <UserAddOutlined />
            회원등록
          </Button>
        </ButtonWrapper>
      </FormStyle>
      <Modal
        centered
        open={isSuccessModal}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <div style={{ textAlign: "center" }}>
          <CheckCircleTwoTone
            twoToneColor="#52c41a"
            style={{
              fontSize: "50px",
              marginBottom: "20px",
            }}
          />
        </div>
        <div
          style={{
            fontSize: "30px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          회원가입이{" "}
          <span style={{ fontSize: "35px", color: "green" }}>완료</span>{" "}
          되었습니다.
        </div>
        <div style={{ textAlign: "center", fontSize: "16px" }}>
          <span style={{ fontSize: "20px", color: "green" }}>{nickname}</span>
          님, 회원가입을 축하합니다.
          <br />
          로그인 해주세요 <SmileOutlined />
        </div>
      </Modal>
    </FormWrapper>
  );
};

export default Signup;
