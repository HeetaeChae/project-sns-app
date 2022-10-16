import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, List, Modal, Avatar } from "antd";

const Follower = () => {
  const user = useSelector((state) => state.user);
  const [followers, setFollowers] = useState([]);
  const [openFollower, setOpenFollower] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:7000/api/follow/getFollower", {
        userTo: user.me._id,
      })
      .then((res) => {
        if (res.data.success) {
          setFollowers([...res.data.doc]);
          console.log(res.data.doc);
        } else {
          console.log(res.data.err);
        }
      });
  }, []);

  const handleOk = () => {
    setOpenFollower(false);
  };

  return (
    <>
      <Button onClick={() => setOpenFollower(true)}>팔로워 클릭</Button>
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
        <List
          itemLayout="horizontal"
          dataSource={followers}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={item.userFrom.nickname}
                description={item.userFrom.intro}
              />
              <div
                style={{ marginRight: "15px", color: "gray", fontSize: "12px" }}
              >
                {item.userFrom.email}
              </div>
              <Button>팔로우</Button>
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};

export default Follower;
