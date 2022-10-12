import styled from "styled-components";
import { Button, Form, Input, notification } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LOG_IN } from "../../../store/modules/user";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const ProfileEdit = ({ me }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);

  const profileEditSuccess = () => {
    notification.open({
      message: "프로필 수정",
      description: "프로필 수정을 성공하였습니다.",
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

  const onFinish = (data) => {
    data._id = me._id;
    axios.post("http://localhost:7000/api/user/editUser", data).then((res) => {
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
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            {me.nickname}
          </h1>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "500",
              color: "gray",
              marginBottom: "20px",
            }}
          >
            {me.email}
          </div>
          <div
            style={{
              wordBreak: "break-all",
              color: "gray",
            }}
          >
            {me.intro ? (
              me.intro
            ) : (
              <span style={{ color: "red" }}>자기소개를 입력해주세요.</span>
            )}
          </div>
          <Button
            onClick={() => setIsEdit(true)}
            style={{
              marginTop: "50px",
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
