import { Avatar, Card, Button } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const { Meta } = Card;

const User = () => {
  return (
    <Card
      style={{
        width: 250,
        marginBottom: 30,
        marginRight: 5,
      }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <Button>
          <UserOutlined />
          내프로필
        </Button>,
        <Button type="primary">
          <LogoutOutlined />
          로그아웃
        </Button>,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="채희태"
        description="This is the description"
      />
    </Card>
  );
};

export default User;
