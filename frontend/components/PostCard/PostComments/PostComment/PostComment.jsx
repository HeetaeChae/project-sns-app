import { Comment, Avatar, Tooltip, Button, Popover, notification } from "antd";
import { SmallDashOutlined, InfoCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";

const CommentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const deleteCommentSuccess = () => {
  notification.open({
    message: "댓글 삭제",
    description: "댓글을 삭제하였습니다.",
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#10e94a",
        }}
      />
    ),
  });
};
const deleteCommentFailure = () => {
  notification.open({
    message: "댓글 삭제",
    description: "자신이 쓴 댓글만 삭제할 수 있습니다.",
    icon: (
      <InfoCircleOutlined
        style={{
          color: "red",
        }}
      />
    ),
  });
};

const PostComment = ({ comment, setDeletedCommentId }) => {
  const userId = useSelector((state) => state.user.me._id);
  const me = useSelector((state) => state.user.me);
  const writerId = comment.writer._id;

  const onDeleteComment = () => {
    if (userId === writerId) {
      axios
        .post("http://localhost:7000/api/comment/deleteComment", {
          commentId: comment._id,
        })
        .then((res) => {
          if (res.data.success) {
            setDeletedCommentId(res.data.doc._id);
            deleteCommentSuccess();
          } else {
            console.log(res.data.err);
          }
        });
    } else {
      deleteCommentFailure();
    }
  };

  const content = (
    <div style={{ display: "flex" }}>
      <Button onClick={onDeleteComment}>삭제</Button>
    </div>
  );

  return (
    <CommentWrapper>
      <Comment
        author={<a>{comment.writer.nickname}</a>}
        avatar={
          comment.writer.image ? (
            <Avatar src={`http://localhost:7000/${comment.writer.image}`} />
          ) : (
            <Avatar>{comment.writer.nickname[0]}</Avatar>
          )
        }
        content={<p>{comment.comment}</p>}
        datetime={
          <Tooltip title={comment.date}>
            <span>{comment.date}</span>
          </Tooltip>
        }
        style={{ width: "100%" }}
      />
      <Popover content={content}>
        <SmallDashOutlined />
      </Popover>
    </CommentWrapper>
  );
};

export default PostComment;
