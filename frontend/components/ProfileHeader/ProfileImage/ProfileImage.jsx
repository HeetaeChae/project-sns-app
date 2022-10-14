import styled from "styled-components";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Button, Card, notification } from "antd";
import {
  UserOutlined,
  CameraOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LOG_IN } from "../../../store/modules/user";

const CoverStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: rgb(235, 237, 240);
`;

const imageUploadSuccess = () => {
  notification.open({
    message: "이미지 업로드",
    description: "프로필 이미지를 업로드했습니다.",
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#10e94a",
        }}
      />
    ),
  });
};
const imageUploadFailure = () => {
  notification.open({
    message: "이미지 업로드.",
    description: "프로필 이미지 업로드를 실패했습니다.",
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#e91010",
        }}
      />
    ),
  });
};

const ProfileImage = ({ me }) => {
  const dispatch = useDispatch();

  const [image, setImage] = useState(me.image);

  const onDrop = (files) => {
    let formData = new FormData();
    formData.append("file", files[0]);
    axios.post("http://localhost:7000/api/post/image", formData).then((res) => {
      if (res.data.success) {
        setImage(res.data.fileName);
        imageUploadSuccess();
      } else {
        console.log(res.data.err);
        imageUploadFailure();
      }
    });
  };

  useEffect(() => {
    const variables = {
      editType: "image",
      _id: me._id,
      image,
    };
    axios
      .post("http://localhost:7000/api/user/editUser", variables)
      .then((res) => {
        if (res.data.success) {
          dispatch({ type: LOG_IN, payload: res.data.doc });
        } else {
          console.log(res.data.err);
        }
      });
  }, [image]);

  return (
    <Card
      style={{
        width: 200,
        marginRight: 15,
      }}
      cover={
        image ? (
          <img
            alt="profileImage"
            src={`http://localhost:7000/${image}`}
            style={{ width: "100%" }}
          />
        ) : (
          <CoverStyle>
            <UserOutlined style={{ fontSize: "65px", marginBottom: "10px" }} />
          </CoverStyle>
        )
      }
    >
      <div style={{ textAlign: "center" }}>
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Button
                  type="primary"
                  style={{ marginBottom: "10px", width: "130px" }}
                >
                  <CameraOutlined />
                  이미지 등록
                </Button>
              </div>
            </section>
          )}
        </Dropzone>
        <Button style={{ width: "130px" }} onClick={() => setImage("")}>
          <DeleteOutlined />
          이미지 삭제
        </Button>
      </div>
    </Card>
  );
};

export default ProfileImage;
