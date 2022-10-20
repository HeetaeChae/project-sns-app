import { List, Button, Avatar, notification } from "antd";
import { InfoCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const deleteFollowingSuccess = (nickname) => {
  notification.open({
    message: "팔로잉",
    description: `팔로잉 목록에서 ${nickname}님을 삭제했습니다.`,
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#108ee9",
        }}
      />
    ),
  });
};

const FollowingCard = ({ following, setDeleteFollowing }) => {
  const user = useSelector((state) => state.user);

  const onClickDeleteFollowing = useCallback(() => {
    const variables = {
      userTo: following.userTo._id,
      userFrom: user.me._id,
    };
    axios
      .post("http://localhost:7000/api/follow/addFollow", variables)
      .then((res) => {
        if (res.data.success) {
          //삭제면 isFollow가 false
          if (!res.data.isFollow) {
            deleteFollowingSuccess(res.data.doc.userTo.nickname);
            setDeleteFollowing(res.data.doc._id);
          }
        } else {
          console.log(res.data.err);
        }
      });
  });

  return (
    <>
      <List.Item
        key={following._id}
        extra={
          <Button type="primary" danger onClick={onClickDeleteFollowing}>
            <DeleteOutlined />
            팔로잉 삭제
          </Button>
        }
      >
        <List.Item.Meta
          avatar={
            <Avatar src={`http://localhost:7000/${following.userTo.image}`} />
          }
          title={following.userTo.nickname}
          description={following.userTo.email}
        />
        {following.userTo.intro}
      </List.Item>
    </>
  );
};

export default FollowingCard;
