import { useCallback, useState } from "react";
import { Avatar, Card, Button, Popover, notification, Modal } from "antd";
import {
  MessageOutlined,
  MessageFilled,
  DeleteOutlined,
  InfoCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import PostImage from "./PostImage/PostImage";
import { DELETE_POST } from "../../store/modules/post";

import PostComments from "./PostComments/PostComments";
import PostLike from "./PostLike/PostLike";
import PostScrap from "./PostScrap/PostScrap";
import PostFollow from "./PostFollow/PostFollow";
import PostEdit from "./PostEdit/PostEdit";

const { Meta } = Card;

const ModalStyle = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
//포스트 삭제 알림창
const deletePostSuccess = () => {
  notification.open({
    message: "포스트 삭제",
    description: "포스트를 삭제했습니다.",
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#108ee9",
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
const editPostFailure = () => {
  notification.open({
    message: "포스트 수정",
    description: "자신이 쓴 포스트만 수정할 수 있습니다.",
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#e91010",
        }}
      />
    ),
  });
};

const PostCard = ({ post }) => {
  const [isComment, setIsComment] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const userId = user.me._id;
  const writerId = post.writer._id;

  //포스트 삭제 확인 모달창
  const deletePost = useCallback(() => {
    setIsDeleteModal(true);
  }, [isDeleteModal]);
  //포스트 삭제 기능
  const deleteOk = () => {
    if (userId === writerId) {
      const variable = { postId: post._id };
      axios
        .post("http://localhost:7000/api/post/deletePost", variable)
        .then((res) => {
          if (res.data.success) {
            deletePostSuccess();
            dispatch({ type: DELETE_POST, payload: res.data.doc });
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
  //포스트 수정 띄우기
  const editPost = () => {
    if (user.me._id !== post.writer._id) {
      return editPostFailure();
    }
    setIsEdit(true);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      {isEdit ? (
        <PostEdit post={post} setIsEdit={setIsEdit} />
      ) : (
        <Card
          extra={
            <div style={{ color: "gray", fontSize: "12px" }}>
              작성일 {post.date}
            </div>
          }
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
                    marginTop: "8px",
                  }}
                />
              ) : (
                <MessageOutlined
                  key="코멘트"
                  onClick={() => setIsComment(true)}
                  style={{
                    marginTop: "8px",
                  }}
                />
              )}
            </>,
            <>
              <Button onClick={editPost} style={{ marginRight: "10px" }}>
                <EditOutlined key="수정" />
                수정
              </Button>
              <Button onClick={deletePost} type="primary">
                <DeleteOutlined key="삭제" />
                삭제
              </Button>
            </>,
          ]}
        >
          <Meta
            avatar={
              <Popover content={<PostFollow userTo={post.writer._id} />}>
                {post.writer.image ? (
                  <Avatar src={`http://localhost:7000/${post.writer.image}`} />
                ) : (
                  <Avatar>{post.writer.nickname[0]}</Avatar>
                )}
              </Popover>
            }
            title={post.writer.nickname}
            description={post.writer.email}
          />
          <div style={{ marginTop: "20px" }}>{post.content}</div>
        </Card>
      )}
      {isDeleteModal && (
        <ModalStyle
          open={isDeleteModal}
          onOk={deleteOk}
          onCancel={deleteCancel}
          centered
          title="포스트 삭제"
          footer={[
            <Button key="cancel" onClick={deleteCancel}>
              취소
            </Button>,
            <Button key="ok" type="primary" onClick={deleteOk}>
              네
            </Button>,
          ]}
        >
          <div style={{ fontSize: "18px", textAlign: "center" }}>
            <span>
              <span style={{ color: "rgb(64, 169, 255)" }}>
                {user.me.nickname}
              </span>
              님,
              <br />
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
