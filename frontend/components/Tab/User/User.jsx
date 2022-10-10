import { Avatar, Card, Button, Modal } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  QuestionCircleTwoTone,
  CameraOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logOutRequest, LOG_OUT } from "../../../store/modules/user";
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import axios from "axios";

const { Meta } = Card;

const ModalStyle = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoverStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 300px;
  background-color: rgb(235, 237, 240);
  &:hover {
    cursor: pointer;
  }
`;

const User = () => {
  const dispatch = useDispatch();
  const isLoggingOut = useSelector((state) => state.user.isLoggingOut);
  const me = useSelector((state) => state.user.me);
  //console.log(me);
  const [isLogoutModal, setIsLogoutModal] = useState(false);

  const handleOk = () => {
    setIsLogoutModal(false);
    axios
      .get("http://localhost:7000/api/user/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          dispatch({ type: LOG_OUT });
        } else {
          console.log(res.data);
        }
      });
  };
  const handleCancel = () => {
    setIsLogoutModal(false);
  };

  return (
    <>
      <Card
        style={{
          width: 300,
          marginBottom: 50,
        }}
        cover={
          me.image ? (
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          ) : (
            <Link href="/profile">
              <a>
                <CoverStyle>
                  <CameraOutlined
                    style={{ fontSize: "80px", marginBottom: "10px" }}
                  />
                  프로필 이미지를 등록해주세요.
                </CoverStyle>
              </a>
            </Link>
          )
        }
        actions={[
          <Link href="/profile">
            <a>
              <Button>
                <UserOutlined />
                내프로필
              </Button>
            </a>
          </Link>,
          isLoggingOut ? (
            <Button
              type="primary"
              onClick={() => setIsLogoutModal(true)}
              loading
            >
              <LogoutOutlined />
              로그아웃
            </Button>
          ) : (
            <Button type="primary" onClick={() => setIsLogoutModal(true)}>
              <LogoutOutlined />
              로그아웃
            </Button>
          ),
        ]}
      >
        <Meta
          avatar={<Avatar>{me.nickname[0]}</Avatar>}
          title={`${me.nickname}님, 반갑습니다.`}
          description={me.email}
        />
      </Card>
      <ModalStyle
        open={isLogoutModal}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        title="로그아웃"
      >
        <div style={{ fontSize: "16px", textAlign: "center" }}>
          <QuestionCircleTwoTone style={{ fontSize: "20px" }} />{" "}
          <span style={{ color: "rgb(64, 169, 255)" }}>{me.nickname}</span>님,
          정말 로그아웃 하시겠습니까?
        </div>
      </ModalStyle>
    </>
  );
};

export default User;
