import { Menu, Badge, Avatar, Card } from "antd";
import {
  HomeOutlined,
  BookOutlined,
  TeamOutlined,
  HeartTwoTone,
} from "@ant-design/icons";

const Menubar = () => {
  return (
    <div
      style={{
        marginTop: "10px",
        marginBottom: "10px",
        border: "1px solid rgb(242, 243, 246)",
        width: "250px",
      }}
    >
      <Menu
        mode="inline"
        style={{
          width: 250,
        }}
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          홈
        </Menu.Item>
        <Menu.Item key="scrap" icon={<BookOutlined />}>
          스크랩
        </Menu.Item>
        <Menu.Item key="follow" icon={<TeamOutlined />}>
          팔로우
        </Menu.Item>
        <Badge.Ribbon text="Like" color="pink">
          <Card title="받은 좋아요 수" size="small">
            <HeartTwoTone
              twoToneColor="#eb2f96"
              style={{ margin: "0 10px", fontSize: "1rem" }}
            />
            10k
          </Card>
        </Badge.Ribbon>
      </Menu>
    </div>
  );
};

export default Menubar;
