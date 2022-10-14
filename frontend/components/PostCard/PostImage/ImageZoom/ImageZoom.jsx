import { Modal } from "antd";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageZoom = ({ open, setOpen, image }) => {
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
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={800}
    >
      <Slider {...settings}>
        {image &&
          image.map((image) => (
            <div>
              <img
                key={image}
                src={`http://localhost:7000/${image}`}
                style={{
                  width: "100%",
                }}
              />
            </div>
          ))}
      </Slider>
    </Modal>
  );
};

export default ImageZoom;
