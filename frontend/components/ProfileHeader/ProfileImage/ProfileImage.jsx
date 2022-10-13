import styled from "styled-components";
import { Button, Card } from "antd";
import {
  UserOutlined,
  CameraOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const CoverStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: rgb(235, 237, 240);
`;

const ProfileImage = ({ me }) => {
  const [image, setImage] = useState("");
  return (
    <Card
      style={{
        width: 200,
        marginRight: 15,
      }}
      cover={
        image ? (
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        ) : (
          <CoverStyle>
            <UserOutlined style={{ fontSize: "70px", marginBottom: "10px" }} />
          </CoverStyle>
        )
      }
    >
      <div style={{ textAlign: "center" }}>
        <Button type="primary" style={{ marginBottom: "10px", width: "130px" }}>
          <CameraOutlined />
          이미지 등록
        </Button>
        <Button style={{ width: "130px" }}>
          <DeleteOutlined />
          이미지 삭제
        </Button>
      </div>
    </Card>
  );
};

export default ProfileImage;
