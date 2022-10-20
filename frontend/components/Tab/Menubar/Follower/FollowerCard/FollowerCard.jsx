import { List, Button, Avatar, notification } from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

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

const FollowerCard = ({ follower }) => {
  const user = useSelector((state) => state.user);
  const [isFollow, setIsFollow] = useState(false);
  console.log(isFollow);
  //userTo가 userFrom의 userId
  //userFrom가 내 userId
  //검증해서 있으면 isFollow true, 없으면 isFollow false 하라고!

  useEffect(() => {
    const variables = {
      userTo: follower.userFrom._id,
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
      userTo: follower.userFrom._id,
      userFrom: user.me._id,
    };
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
      <List.Item
        key={follower._id}
        extra={
          isFollow ? (
            <Button type="primary" danger onClick={onClickAddFollow}>
              <MinusCircleOutlined />
              언팔로우
            </Button>
          ) : (
            <Button
              type="primary"
              style={{ padding: "0 21.45px" }}
              onClick={onClickAddFollow}
            >
              <PlusCircleOutlined /> 팔로우
            </Button>
          )
        }
      >
        <List.Item.Meta
          avatar={
            <Avatar src={`http://localhost:7000/${follower.userFrom.image}`} />
          }
          title={follower.userFrom.nickname}
          description={follower.userFrom.email}
        />
        {follower.userFrom.intro}
      </List.Item>
    </>
  );
};

export default FollowerCard;
