import { Input, Button } from "antd";
import { CameraOutlined, UploadOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { TextArea } = Input;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 10px;
`;

const PostForm = () => {
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  return (
    <>
      <TextArea
        showCount
        maxLength={300}
        style={{
          height: 200,
        }}
        onChange={onChange}
      />
      <ButtonWrapper>
        <Button style={{ marginRight: "5px" }}>
          <CameraOutlined />
          이미지
        </Button>
        <Button type="primary">
          <UploadOutlined />
          업로드
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default PostForm;
