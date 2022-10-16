import { Avatar, Button, notification } from "antd";
import { InfoCircleOutlined, CommentOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import day from "../../../hook/day";
import PostComment from "./PostComment/PostComment";

const CommentsWrapper = styled.div`
  padding: 30px 50px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const CommentNumStyle = styled.div`
  font-weight: 700;
  text-align: start;
  margin-bottom: 20px;
  width: 100%;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const InputStyle = styled.input`
  margin: auto 0;
  padding: 5px 10px;
  width: 100%;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  transition: 0.3s;
  &:focus {
    border-bottom: 2px solid black;
  }
`;
const ButtonWrapper = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

//포스트 삭제 알림창
const addCommentSuccess = () => {
  notification.open({
    message: "댓글 등록",
    description: "댓글을 등록하였습니다.",
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#108ee9",
        }}
      />
    ),
  });
};

const PostComments = ({ postId }) => {
  const user = useSelector((state) => state.user);

  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [deletedCommentId, setDeletedCommentId] = useState("");

  //댓글 불러오기
  useEffect(() => {
    axios
      .post("http://localhost:7000/api/comment/getComment", { postId })
      .then((res) => {
        if (res.data.success) {
          setComments([...res.data.doc, ...comments]);
        } else {
          console.log(res.data.err);
        }
      });
  }, []);

  //댓글 삭제하기
  useEffect(() => {
    const deletedComments = comments.filter(
      (comment) => comment._id !== deletedCommentId
    );
    setComments([...deletedComments]);
  }, [deletedCommentId]);

  //댓글 추가하기
  const onSubmitComment = useCallback(() => {
    const variables = {
      writer: user.me._id,
      postId,
      comment: text,
      date: day(),
    };
    axios
      .post("http://localhost:7000/api/comment/addComment", variables)
      .then((res) => {
        if (res.data.success) {
          setComments([res.data.doc, ...comments]);
          setText("");
          addCommentSuccess();
        } else {
          console.log(res.data.err);
        }
      });
  }, [text]);

  return (
    <CommentsWrapper>
      <CommentNumStyle>{comments.length}개의 댓글</CommentNumStyle>
      {user.isLoggedIn && (
        <div style={{ width: "100%" }}>
          <InputWrapper>
            {user.me.image ? (
              <Avatar src={`http://localhost:7000/${user.me.image}`} />
            ) : (
              <Avatar>{user.me.nickname[0]}</Avatar>
            )}
            <InputStyle
              value={text}
              placeholder="댓글을 입력해주세요."
              onChange={(e) => setText(e.target.value)}
            />
          </InputWrapper>
          <ButtonWrapper>
            <Button style={{ marginRight: "5px" }} onClick={() => setText("")}>
              취소
            </Button>
            <Button type="primary" onClick={onSubmitComment}>
              등록
            </Button>
          </ButtonWrapper>
        </div>
      )}
      {comments.map((comment) => (
        <PostComment
          comment={comment}
          key={comment._id}
          setDeletedCommentId={setDeletedCommentId}
        />
      ))}
    </CommentsWrapper>
  );
};

export default PostComments;
