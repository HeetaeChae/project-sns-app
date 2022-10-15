import { useCallback, useState } from "react";
import { Avatar, Card, Button, Popover, notification, Modal } from "antd";
import {
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
import PostImage from "./PostImage/PostImage";
import { DELETE_POST } from "../../store/modules/post";
import PostComments from "./PostComments/PostComments";
import PostLike from "./PostLike/PostLike";
import PostScrap from "./PostScrap/PostScrap";

const { Meta } = Card;

const ModalStyle = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostCard = ({ post }) => {
  const [isComment, setIsComment] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const userId = user.me._id;
  const writerId = post.writer._id;

  //포스트 삭제 알림창
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
  //포스트 삭제 확인 모달창
  const deletePost = useCallback(() => {
    setIsDeleteModal(true);
  }, [isDeleteModal]);
  //포스트 삭제 기능
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
    <div style={{ marginBottom: "10px" }}>
      <Card
        extra={`작성 ${post.date}`}
        cover={post.image.length !== 0 && <PostImage image={post.image} />}
        actions={[
          <PostLike postId={post._id} />,
          <PostScrap postId={post._id} writer={writerId} />,
          <>
            {isComment ? (
              <MessageFilled
                key="코멘트"
                onClick={() => setIsComment(false)}
                style={{
                  marginTop: "7px",
                  color: "#3FA9FF",
                  fontSize: "large",
                }}
              />
            ) : (
              <MessageOutlined
                key="코멘트"
                onClick={() => setIsComment(true)}
                style={{
                  marginTop: "7px",
                  color: "#3FA9FF",
                  fontSize: "large",
                }}
              />
            )}
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
      {isComment && <PostComments postId={post._id} />}
    </div>
  );
};

export default PostCard;
