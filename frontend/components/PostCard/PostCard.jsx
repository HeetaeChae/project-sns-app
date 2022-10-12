import { useCallback, useState } from "react";
import { Avatar, Card, Button, Popover, notification, Modal } from "antd";
import {
  HeartOutlined,
  HeartTwoTone,
  BookOutlined,
  BookFilled,
  MessageOutlined,
  MessageFilled,
  DeleteOutlined,
  UserAddOutlined,
  InfoCircleOutlined,
  QuestionCircleTwoTone,
} from "@ant-design/icons";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Comment from "./Comment/Comment";
import PostImage from "./PostImage/PostImage";
import { DELETE_POST } from "../../store/modules/post";

const { Meta } = Card;

const ModalStyle = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostCard = ({ post }) => {
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

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const userId = user.me._id;
  const writerId = post.writer._id;

  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const deletePostSuccess = () => {
    notification.open({
      message: "포스트 삭제",
      description: "포스트 삭제를 성공하였습니다.",
      icon: (
        <InfoCircleOutlined
          style={{
            color: "#10e94a",
          }}
        />
      ),
    });
  };
  const deletePostFailure = () => {
    notification.open({
      message: "포스트 삭제",
      description: "자신이 쓴 포스트만 삭제할 수 있습니다.",
      icon: (
        <InfoCircleOutlined
          style={{
            color: "#e91010",
          }}
        />
      ),
    });
  };

  const deletePost = () => {
    setIsDeleteModal(true);
  };

  const deleteOk = (id) => {
    if (userId === writerId) {
      axios
        .post("http://localhost:7000/api/post/deletePost", { id })
        .then((res) => {
          if (res.data.success) {
            deletePostSuccess();
            dispatch({ type: DELETE_POST, payload: id });
          } else {
            console.log(res.data.err);
          }
        });
    } else {
      deletePostFailure();
    }
    setIsDeleteModal(false);
  };
  const deleteCancel = () => {
    setIsDeleteModal(false);
  };

  return (
    <>
      <Card
        style={{ marginTop: "10px" }}
        extra={`작성 ${post.date}`}
        cover={post.image.length !== 0 && <PostImage image={post.image} />}
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
          <Button
            style={{ marginTop: "5px" }}
            onClick={deletePost}
            type="primary"
          >
            <DeleteOutlined key="삭제" />
            <span>삭제</span>
          </Button>,
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
              <Avatar>{post.writer.nickname[0]}</Avatar>
            </Popover>
          }
          title={post.writer.nickname}
          description={post.writer.email}
        />
        <div style={{ marginTop: "20px" }}>{post.content}</div>
      </Card>
      {isDeleteModal && (
        <ModalStyle
          open={isDeleteModal}
          onOk={() => deleteOk(post._id)}
          onCancel={deleteCancel}
          centered
          title="포스트 삭제"
        >
          <div style={{ fontSize: "16px", textAlign: "center" }}>
            <QuestionCircleTwoTone style={{ fontSize: "20px" }} />
            <br />
            <span>
              정말 포스트를 삭제하시겠습니까? <br />
              삭제한 포스트는 복구할 수 없습니다.
            </span>
          </div>
        </ModalStyle>
      )}
      {isComment && <Comment />}
    </>
  );
};

export default PostCard;
