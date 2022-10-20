import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, List, Modal, Result } from "antd";
import FollowingCard from "./FollowingCard/FollowingCard";

const Following = () => {
  const user = useSelector((state) => state.user);
  const [followings, setFollowings] = useState([]);
  const [openFollowing, setOpenFollowing] = useState(false);
  const [deleteFollowing, setDeleteFollowing] = useState("");

  useEffect(() => {
    if (openFollowing) {
      const variable = { userId: user.me._id };
      axios
        .post("http://localhost:7000/api/follow/getFollowing", variable)
        .then((res) => {
          if (res.data.success) {
            setFollowings([...res.data.doc]);
          } else {
            console.log(res.data.err);
          }
        });
    } else if (!openFollowing) {
      setFollowings([]);
    }
  }, [openFollowing]);

  useEffect(() => {
    const deletedFollowings = followings.filter(
      (following) => following._id !== deleteFollowing
    );
    setFollowings([...deletedFollowings]);
    console.log(followings);
    console.log(deleteFollowing);
  }, [deleteFollowing]);

  const handleOk = () => {
    setOpenFollowing(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpenFollowing(true)}
        style={{ width: "100%" }}
        type="primary"
      >
        팔로잉
      </Button>
      <Modal
        centered
        width={1000}
        title="팔로잉"
        open={openFollowing}
        onCancel={handleOk}
        footer={[
          <Button key="ok" onClick={handleOk}>
            확인
          </Button>,
        ]}
      >
        {/* 리스트 부분 */}
        {followings.length === 0 && (
          <Result title={`${user.me.nickname}님, 팔로잉이 없습니다.`} />
        )}
        {followings.length !== 0 && (
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 5,
            }}
            dataSource={followings}
            footer={
              <div>
                <b style={{ color: "rgb(64, 169, 255)" }}>{user.me.nickname}</b>
                님의 팔로잉 목록
              </div>
            }
            renderItem={(following) => (
              <FollowingCard
                following={following}
                setDeleteFollowing={setDeleteFollowing}
              />
            )}
          />
        )}
      </Modal>
    </>
  );
};

export default Following;
