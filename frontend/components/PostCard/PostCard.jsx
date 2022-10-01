import { Avatar, Card, Button, Popover } from "antd";
import {
  HeartOutlined,
  BookOutlined,
  CommentOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import Comment from "./Comment/Comment";

const { Meta } = Card;

const PostCard = () => {
  return (
    <>
      <Card
        extra="22-10-1"
        style={{
          marginTop: 30,
        }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <>
            <HeartOutlined key="좋아요" />
            <span>좋아요</span>
          </>,
          <>
            <BookOutlined key="스크랩" />
            <span>스크랩</span>
          </>,
          <>
            <CommentOutlined key="코멘트" />
            <span>댓글</span>
          </>,
          <>
            <DeleteOutlined key="삭제" />
            <span>삭제</span>
          </>,
        ]}
      >
        <Meta
          avatar={
            <Popover
              content={
                <Button>
                  <UserAddOutlined />
                  팔로우
                </Button>
              }
            >
              <Avatar src="https://joeschmoe.io/api/v1/random" />
            </Popover>
          }
          title="채희태"
          description="This is the description"
        />
        <div style={{ marginTop: "20px" }}>콘텐츠 내용</div>
      </Card>
      <Comment />
    </>
  );
};

export default PostCard;
