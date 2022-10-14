import Dropzone from "react-dropzone";
import { Button, notification } from "antd";
import { CameraOutlined, InfoCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const imageUploadSuccess = () => {
  notification.open({
    message: "이미지 업로드",
    description: "이미지 업로드를 성공하였습니다.",
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
    description: "이미지 업로드를 실패했습니다.",
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#e91010",
        }}
      />
    ),
  });
};

const ImageUpload = ({ image, setImage }) => {
  const onDrop = (files) => {
    let formData = new FormData();
    formData.append("file", files[0]);
    axios.post("http://localhost:7000/api/post/image", formData).then((res) => {
      if (res.data.success) {
        setImage([...image, res.data.fileName]);
        imageUploadSuccess();
      } else {
        imageUploadFailure();
      }
    });
  };
  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Button>
              <CameraOutlined />
              이미지 업로드
            </Button>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default ImageUpload;
