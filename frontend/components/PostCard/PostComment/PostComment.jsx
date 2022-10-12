import { Avatar, Card, Input, Button, Modal, Comment, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { TextArea } = Input;

const PostComment = ({ comment }) => {
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  const deleteSuccess = () => {
    Modal.success({
      content: "댓글을 삭제하였습니다.",
    });
  };
  const deleteFail = () => {
    Modal.error({
      content: "자신이 작성한 댓글만 삭제할 수 있습니다.",
    });
  };

  const [action, setAction] = useState(null);

  const actions = [
    <Tooltip key="comment-delete" title="삭제">
      <span onClick={() => setAction("삭제")} />
    </Tooltip>,
    <Tooltip key="comment-edit" title="수정">
      <span onClick={() => setAction("수정")} />
    </Tooltip>,
  ];
  return (
    <>
      {/* 해당 포스트의 코멘트 갯수 */}
      <Comment
        actions={actions}
        author={<a>Han Solo</a>}
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <p>
            We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure), to help people create
            their product prototypes beautifully and efficiently.
          </p>
        }
        datetime={
          <Tooltip title="2016-11-22 11:22:33">
            <span>8 hours ago</span>
          </Tooltip>
        }
      />
    </>
  );
};

export default PostComment;
