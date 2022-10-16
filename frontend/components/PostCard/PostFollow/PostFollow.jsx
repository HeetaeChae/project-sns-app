import { Button, notification } from "antd";
import {
  UsergroupAddOutlined,
  UsergroupDeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const addFollowSuccess = (nickname) => {
  notification.open({
    message: "팔로우",
    description: `${nickname}님을 팔로우했습니다.`,
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#108ee9",
        }}
      />
    ),
  });
};
const addUnfollowSuccess = (nickname) => {
  notification.open({
    message: "팔로우",
    description: `${nickname}님을 언팔로우했습니다.`,
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#108ee9",
        }}
      />
    ),
  });
};
const addFollowFailureLogout = () => {
  notification.open({
    message: "팔로우",
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
const addFollowFailureMe = () => {
  notification.open({
    message: "팔로우",
    description: "자신을 팔로우할 수 없습니다.",
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#e91010",
        }}
      />
    ),
  });
};

const PostFollow = ({ userTo }) => {
  const user = useSelector((state) => state.user);
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    const variables = {
      userTo,
      userFrom: user.me._id,
    };
    axios
      .post("http://localhost:7000/api/follow/getFollow", variables)
      .then((res) => {
        if (res.data.success) {
          setIsFollow(res.data.isFollow);
        } else {
          console.log(res.data.err);
        }
      });
  });

  const onClickAddFollow = useCallback(() => {
    const variables = {
      userTo,
      userFrom: user.me._id,
    };
    if (!variables.userFrom) {
      return addFollowFailureLogout();
    } else if (variables.userTo === variables.userFrom) {
      return addFollowFailureMe();
    }
    axios
      .post("http://localhost:7000/api/follow/addFollow", variables)
      .then((res) => {
        if (res.data.success) {
          setIsFollow(res.data.isFollow);
          if (res.data.isFollow) {
            addFollowSuccess(res.data.doc.userTo.nickname);
          } else {
            addUnfollowSuccess(res.data.doc.userTo.nickname);
          }
        } else {
          console.log(res.data.err);
        }
      });
  });

  return (
    <>
      {isFollow ? (
        <Button type="danger" onClick={onClickAddFollow}>
          <UsergroupDeleteOutlined />
          언팔로우
        </Button>
      ) : (
        <Button type="primary" onClick={onClickAddFollow}>
          <UsergroupAddOutlined />
          팔로우
        </Button>
      )}
    </>
  );
};

export default PostFollow;
