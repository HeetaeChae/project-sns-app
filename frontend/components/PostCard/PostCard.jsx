import { useCallback, useState } from "react";
import { Avatar, Card, Button, Popover } from "antd";
import {
  HeartOutlined,
  HeartTwoTone,
  BookOutlined,
  BookFilled,
  MessageOutlined,
  MessageFilled,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

import Comment from "./Comment/Comment";
import PostImage from "./PostImage/PostImage";

const { Meta } = Card;

const PostCard = () => {
  //좋아요 여부 서버로 통신한 뒤 저장.
  const [isLike, setIsLike] = useState(false);
  const onClickIsLike = useCallback(() => {
    setIsLike(!isLike);
  }, [isLike]);
  const [isComment, setIsComment] = useState(false);
  const onClickIsComment = useCallback(() => {
    setIsComment(!isComment);
  }, [isComment]);
  //scrap 여부 서버로 통신한 뒤 저장.
  const [isScrap, setIsScrap] = useState(false);
  const onClickIsScrap = useCallback(() => {
    setIsScrap(!isScrap);
  }, [isScrap]);
  return (
    <>
      <Card
        extra="22-10-1"
        style={{
          marginTop: 30,
        }}
        cover={
          /* PostImage부분 해당 포스트가 가진 이미지 배열 내려주기 */
          <PostImage image />
        }
        actions={[
          <>
            {isLike ? (
              <HeartTwoTone twoToneColor="#eb2f96" onClick={onClickIsLike} />
            ) : (
              <HeartOutlined key="좋아요" onClick={onClickIsLike} />
            )}
            {/* 좋아요 숫자 서버에서 가져오기 */}
            <span>100</span>
          </>,
          <>
            {isScrap ? (
              <BookFilled key="스크랩" onClick={onClickIsScrap} />
            ) : (
              <BookOutlined key="스크랩" onClick={onClickIsScrap} />
            )}
            <span>스크랩</span>
          </>,
          <>
            {isComment ? (
              <MessageFilled key="코멘트" onClick={onClickIsComment} />
            ) : (
              <MessageOutlined key="코멘트" onClick={onClickIsComment} />
            )}

            <span>코멘트</span>
          </>,
          <>
            {/* 로그인 중이면 삭제 아니면 신고 */}
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
              {/* 프로필 사진 없으면 닉네임 첫글자 부분 */}
              <Avatar src="https://joeschmoe.io/api/v1/random" />
            </Popover>
          }
          /* nickname 부분 */
          title="채희태"
          /* email 부분 */
          description="This is the description"
        />
        {/* content 부분 */}
        <div style={{ marginTop: "20px" }}>콘텐츠 내용</div>
      </Card>
      {isComment && <Comment />}
    </>
  );
};

export default PostCard;
