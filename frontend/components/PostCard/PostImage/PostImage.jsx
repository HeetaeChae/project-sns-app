import { useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { PictureOutlined } from "@ant-design/icons";

import ImageZoom from "./ImageZoom/ImageZoom";

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const Image = styled.img`
  border: 0.5px solid rgb(242, 243, 246);
  width: ${(props) => props.width || "50%"};
`;
const ImageZoomButtonWrapper = styled.div`
  border: 0.5px solid rgb(242, 243, 246);
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(242, 243, 246);
`;

const PostImage = ({ image, edit }) => {
  const [open, setOpen] = useState(false);
  if (edit) {
    return (
      <ImageWrapper>
        <Button onClick={() => setOpen(true)}>
          <PictureOutlined />
          이미지 확인
        </Button>
        {open && <ImageZoom open={open} setOpen={setOpen} image={image} />}
      </ImageWrapper>
    );
  } else if (!edit && image.length === 1) {
    return (
      <ImageWrapper>
        <Image
          alt="example"
          src={`http://localhost:7000/${image}`}
          width="100%"
        />
      </ImageWrapper>
    );
  } else if (!edit && image.length === 2) {
    return (
      <ImageWrapper>
        <Image alt="example" src={`http://localhost:7000/${image[0]}`} />
        <Image alt="example" src={`http://localhost:7000/${image[1]}`} />
      </ImageWrapper>
    );
  } else {
    return (
      <ImageWrapper>
        <Image alt="example" src={`http://localhost:7000/${image[0]}`} />
        <ImageZoomButtonWrapper>
          <Button onClick={() => setOpen(true)}>
            <PictureOutlined />더 보기
          </Button>
        </ImageZoomButtonWrapper>
        {open && <ImageZoom open={open} setOpen={setOpen} image={image} />}
      </ImageWrapper>
    );
  }
};

export default PostImage;
