import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { notification } from "antd";
import { StarTwoTone, InfoCircleOutlined } from "@ant-design/icons";
import styled, { keyframes } from "styled-components";

const addSuccess = () => {
  notification.open({
    message: "스크랩",
    description: "이 포스트를 스크랩했습니다.",
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#10e94a",
        }}
      />
    ),
  });
};
const addFailure = () => {
  notification.open({
    message: "스크랩 실패",
    description: "로그인 해주세요.",
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#e91010",
        }}
      />
    ),
  });
};

const ScrapWrapper = styled.div`
  font-size: 20px;
`;

const scraped = keyframes`
  0% {
    transform: scale(.7);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`;
const StarTwoToneStyle = styled(StarTwoTone)`
  animation: ${scraped} 0.4s ease;
`;

const PostScrap = ({ postId, writer }) => {
  const [isScrap, setIsScrap] = useState(false);
  const user = useSelector((state) => state.user);
  console.log(user);

  useEffect(() => {
    const variables = {
      postId,
      user: user.me._id,
      writer,
    };
    axios
      .post("http://localhost:7000/api/scrap/getScrap", variables)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.isScrap);
          setIsScrap(res.data.isScrap);
        } else {
          console.log(res.data.err);
        }
      });
  });

  const onClickAddScrap = useCallback(() => {
    if (!user.isLoggedIn) {
      return addFailure();
    }
    const variables = {
      postId,
      user: user.me._id,
      writer,
    };
    axios
      .post("http://localhost:7000/api/scrap/addScrap", variables)
      .then((res) => {
        if (res.data.success) {
          setIsScrap(res.data.isScrap);
          if (res.data.isScrap) {
            addSuccess();
          }
        } else {
          console.log(res.data.err);
        }
      });
  });

  return (
    <ScrapWrapper onClick={onClickAddScrap}>
      {isScrap ? <StarTwoToneStyle twoToneColor="#ebbf2f" /> : <StarTwoTone />}
    </ScrapWrapper>
  );
};

export default PostScrap;
