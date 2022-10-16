import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { notification } from "antd";
import {
  HeartTwoTone,
  InfoCircleOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";

const addSuccess = () => {
  notification.open({
    message: "좋아요",
    description: "이 포스트에 좋아요를 눌렀습니다.",
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#108ee9",
        }}
      />
    ),
  });
};
const addFailure = () => {
  notification.open({
    message: "좋아요 실패",
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

const LikeWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const liked = keyframes`
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
const HeartTwoToneStyle = styled(HeartTwoTone)`
  animation: ${liked} 0.4s ease;
`;

const PostLike = ({ postId }) => {
  const [likeNum, setLikeNum] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const variables = {
      postId,
      user: user.me._id,
    };
    axios
      .post("http://localhost:7000/api/like/getLike", variables)
      .then((res) => {
        if (res.data.success) {
          setLikeNum(res.data.likeNum);
          setIsLike(res.data.isLike);
        } else {
          console.log(res.data.err);
        }
      });
  });

  const onClickAddLike = useCallback(() => {
    if (!user.isLoggedIn) {
      return addFailure();
    }
    const variables = {
      postId,
      user: user.me._id,
    };
    axios
      .post("http://localhost:7000/api/like/addLike", variables)
      .then((res) => {
        if (res.data.success) {
          setIsLike(res.data.isLike);
          if (res.data.isLike) {
            setLikeNum(likeNum + 1);
            addSuccess();
          } else if (!res.data.isLike) {
            setLikeNum(likeNum - 1);
          }
        } else {
          console.log(res.data.err);
        }
      });
  });

  return (
    <LikeWrapper onClick={onClickAddLike}>
      {isLike ? (
        <>
          <HeartTwoToneStyle twoToneColor="#eb2f96" />
          <div style={{ color: "#eb2f96", marginLeft: "10px" }}>{likeNum}</div>
        </>
      ) : (
        <>
          <HeartOutlined />
          <div style={{ marginLeft: "10px" }}>{likeNum}</div>
        </>
      )}
    </LikeWrapper>
  );
};

export default PostLike;
