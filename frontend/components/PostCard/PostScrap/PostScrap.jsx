import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { notification } from "antd";
import {
  StarTwoTone,
  InfoCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import styled, { keyframes } from "styled-components";
import {
  ADD_SCRAP_COUNT,
  SUBTRACT_SCRAP_COUNT,
} from "../../../store/modules/scrap";
import { useDispatch } from "react-redux";

const addSuccess = () => {
  notification.open({
    message: "스크랩",
    description: "이 포스트를 스크랩했습니다.",
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
  font-size: 16px;
  margin-top: 6px;
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
  const scrapCount = useSelector((state) => state.scrap);
  const dispatch = useDispatch();

  useEffect(() => {
    const variables = {
      postId,
      user: user.me._id,
    };
    axios
      .post("http://localhost:7000/api/scrap/getIsScrap", variables)
      .then((res) => {
        if (res.data.success) {
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
            dispatch({ type: ADD_SCRAP_COUNT });
          } else {
            if (scrapCount > 0) {
              dispatch({ type: SUBTRACT_SCRAP_COUNT });
            }
          }
        } else {
          console.log(res.data.err);
        }
      });
  });

  return (
    <ScrapWrapper onClick={onClickAddScrap}>
      {isScrap ? <StarTwoToneStyle twoToneColor="#ebbf2f" /> : <StarOutlined />}
    </ScrapWrapper>
  );
};

export default PostScrap;
