import styled from "styled-components";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Button, Avatar, notification } from "antd";
import {
  UserOutlined,
  CameraOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LOG_IN } from "../../../store/modules/user";

const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
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
    <ProfileImageWrapper>
      {image ? (
        <Avatar size={200} src={`http://localhost:7000/${image}`} />
      ) : (
        <Avatar size={200} icon={<UserOutlined />} />
      )}
      <div style={{ marginLeft: "50px", textAlign: "center" }}>
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Button
                  type="primary"
                  style={{ marginBottom: "10px", width: "120px" }}
                >
                  <CameraOutlined />
                  이미지 등록
                </Button>
              </div>
            </section>
          )}
        </Dropzone>
        <Button style={{ width: "120px" }} onClick={() => setImage("")}>
          <DeleteOutlined />
          이미지 삭제
        </Button>
      </div>
    </ProfileImageWrapper>
  );
};

export default ProfileImage;
