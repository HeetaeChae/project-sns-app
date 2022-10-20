import { Menu, Badge, Card } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import Follower from "./Follower/Follower";
import Following from "./Following/Following";

const Menubar = () => {
  return (
    <>
      <div
        style={{
          border: "1px solid rgb(242, 243, 246)",
          width: "300px",
        }}
      >
        <Card
          title="팔로우"
          extra={<UsergroupAddOutlined style={{ fontSize: "18px" }} />}
          size="large"
          style={{
            width: 300,
          }}
        >
          <Follower />
          <Following />
        </Card>
      </div>
    </>
  );
};

export default Menubar;
