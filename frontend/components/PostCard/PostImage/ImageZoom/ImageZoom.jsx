import { Modal, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import styled from "styled-components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageZoomWrapper = styled.div`
  position: relative;
`;
const ImageZoomButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;

const ImageZoom = ({ open, setOpen, image, editImage, setDeleteImage }) => {
  const onClickDeleteImage = (image) => {
    setDeleteImage(image);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Modal
      title={`총 ${image.length}개의 이미지`}
      centered
      open={open}
      onCancel={() => setOpen(false)}
      width={850}
      footer={<Button onClick={() => setOpen(false)}>닫기</Button>}
    >
      <Slider {...settings}>
        {image &&
          image.map((image) => (
            <ImageZoomWrapper>
              <img
                key={image}
                src={`http://localhost:7000/${image}`}
                style={{
                  width: "100%",
                }}
              />
              {editImage && (
                <ImageZoomButton
                  type="primary"
                  onClick={() => onClickDeleteImage(image)}
                >
                  <DeleteOutlined />
                  이미지 삭제
                </ImageZoomButton>
              )}
            </ImageZoomWrapper>
          ))}
      </Slider>
    </Modal>
  );
};

export default ImageZoom;
