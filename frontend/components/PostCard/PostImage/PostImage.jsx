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
`;

const dummyImage = [
  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
];

const PostImage = ({ image }) => {
  const [open, setOpen] = useState(false);

  if (image.length === 1) {
    return (
      <ImageWrapper>
        <Image alt="example" src={dummyImage[0]} width="100%" />
      </ImageWrapper>
    );
  } else if (image.length === 2) {
    return (
      <ImageWrapper>
        <Image alt="example" src={image[0]} />
        <Image alt="example" src={image[1]} />
      </ImageWrapper>
    );
  } else {
    return (
      <ImageWrapper>
        <Image alt="example" src={dummyImage[0]} />
        <ImageZoomButtonWrapper>
          <Button type="primary" onClick={() => setOpen(true)}>
            <PictureOutlined />더 보기
          </Button>
        </ImageZoomButtonWrapper>
        {open && <ImageZoom open={open} setOpen={setOpen} image={dummyImage} />}
      </ImageWrapper>
    );
  }
};

export default PostImage;
