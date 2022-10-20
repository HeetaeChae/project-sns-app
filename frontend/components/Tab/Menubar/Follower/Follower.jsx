import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, List, Modal, Avatar, Result } from "antd";
import FollowerCard from "./FollowerCard/FollowerCard";

const Follower = () => {
  const user = useSelector((state) => state.user);
  const [followers, setFollowers] = useState([]);
  const [openFollower, setOpenFollower] = useState(false);

  useEffect(() => {
    if (openFollower) {
      const variable = { userId: user.me._id };
      axios
        .post("http://localhost:7000/api/follow/getFollower", variable)
        .then((res) => {
          if (res.data.success) {
            setFollowers([...res.data.doc]);
          } else {
            console.log(res.data.err);
          }
        });
    } else if (!openFollower) {
      setFollowers([]);
    }
  }, [openFollower]);

  const handleOk = () => {
    setOpenFollower(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpenFollower(true)}
        style={{ width: "100%", marginBottom: "20px" }}
        type="primary"
      >
        팔로워
      </Button>
      <Modal
        centered
        width={1000}
        title="팔로워"
        open={openFollower}
        onCancel={handleOk}
        footer={[
          <Button key="ok" onClick={handleOk}>
            확인
          </Button>,
        ]}
      >
        {/* 리스트 부분 */}
        {followers.length === 0 && (
          <Result title={`${user.me.nickname}님, 팔로워가 없습니다.`} />
        )}
        {followers.length !== 0 && (
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 5,
            }}
            dataSource={followers}
            footer={
              <div>
                <b style={{ color: "rgb(64, 169, 255)" }}>{user.me.nickname}</b>
                님의 팔로워 목록
              </div>
            }
            renderItem={(follower) => <FollowerCard follower={follower} />}
          />
        )}
      </Modal>
    </>
  );
};

export default Follower;
