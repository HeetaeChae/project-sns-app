import styled from "styled-components";
import { Button, Form, Input, notification, Tag } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LOG_IN } from "../../../store/modules/user";

const profileEditSuccess = () => {
  notification.open({
    message: "프로필 수정",
    description: "프로필을 수정했습니다.",
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#10e94a",
        }}
      />
    ),
  });
};
const profileEditFailure = () => {
  notification.open({
    message: "프로필 수정",
    description: "프로필 수정을 실패했습니다.",
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#e91010",
        }}
      />
    ),
  });
};

const ButtonWrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const TagStyle = styled(Tag)`
  width: 100%;
  padding: 10px;
  background-color: white;
  font-size: 18px;
  white-space: pre-line;
`;

const ProfileEdit = ({ me }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);

  const onFinish = (data) => {
    const variables = {
      editType: "info",
      _id: me._id,
      intro: data.intro,
      nickname: data.nickname,
    };
    axios
      .post("http://localhost:7000/api/user/editUser", variables)
      .then((res) => {
        if (res.data.success) {
          dispatch({ type: LOG_IN, payload: res.data.doc });
          setIsEdit(false);
          profileEditSuccess();
        } else {
          profileEditFailure();
        }
      });
  };
  return (
    <>
      {isEdit ? (
        <div style={{ width: "30%" }}>
          <Form
            onFinish={onFinish}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
          >
            <Form.Item
              name="nickname"
              label={
                <label style={{ fontSize: "18px", fontWeight: "700" }}>
                  닉네임
                </label>
              }
            >
              <Input size="large" placeholder="닉네임을 입력하세요." />
            </Form.Item>
            <Form.Item
              name="intro"
              label={
                <label
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    marginTop: "25px",
                  }}
                >
                  자기소개
                </label>
              }
            >
              <Input.TextArea
                size="large"
                rows={4}
                placeholder="자기소개를 입력하세요."
              />
            </Form.Item>
            <Form.Item>
              <ButtonWrapper>
                <Button
                  style={{ marginRight: "10px" }}
                  onClick={() => setIsEdit(false)}
                >
                  취소
                </Button>
                <Button type="primary" htmlType="submit">
                  저장
                </Button>
              </ButtonWrapper>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <div style={{ width: "30%", textAlign: "center" }}>
          <Form
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{ color: "red" }}
          >
            <Form.Item
              label={
                <label style={{ fontSize: "18px", fontWeight: "700" }}>
                  닉네임
                </label>
              }
            >
              <TagStyle>{me.nickname}</TagStyle>
            </Form.Item>
            <Form.Item
              label={
                <label style={{ fontSize: "18px", fontWeight: "700" }}>
                  이메일
                </label>
              }
            >
              <TagStyle>{me.email}</TagStyle>
            </Form.Item>
            <Form.Item
              label={
                <label style={{ fontSize: "18px", fontWeight: "700" }}>
                  자기소개
                </label>
              }
            >
              {me.intro ? (
                <TagStyle>{me.intro}</TagStyle>
              ) : (
                <TagStyle color="red">자기소개를 입력해주세요.</TagStyle>
              )}
            </Form.Item>
          </Form>
          <ButtonWrapper>
            <Button
              onClick={() => setIsEdit(true)}
              style={{ marginTop: "5px", marginBottom: "18px" }}
            >
              수정
            </Button>
          </ButtonWrapper>
        </div>
      )}
    </>
  );
};

export default ProfileEdit;
