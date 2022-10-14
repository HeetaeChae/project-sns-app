import styled from "styled-components";
import { Button, Form, Input, notification, Tag, Badge } from "antd";
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
  margin-top: 10px;
`;
const TagStyle = styled(Tag)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px;
  margin-bottom: 15px;
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
    router.push("/");
  };
  return (
    <>
      {isEdit ? (
        <div style={{ width: "200px", marginLeft: "15px" }}>
          <Form onFinish={onFinish}>
            <Form.Item name="nickname">
              <Input
                size="large"
                placeholder="닉네임을 입력하세요."
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item name="intro">
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
        <div style={{ width: "200px", marginLeft: "15px" }}>
          <TagStyle color="blue">
            <div>닉네임 :</div>
            <div>{me.nickname}</div>
          </TagStyle>
          <TagStyle color="blue">
            <div>이메일 :</div>
            <div>{me.email}</div>
          </TagStyle>
          {me.intro ? (
            <TagStyle>{me.intro}</TagStyle>
          ) : (
            <TagStyle color="red">자기소개를 입력해주세요.</TagStyle>
          )}
          <Button
            onClick={() => setIsEdit(true)}
            style={{
              marginTop: "30px",
            }}
          >
            수정
          </Button>
        </div>
      )}
    </>
  );
};

export default ProfileEdit;
