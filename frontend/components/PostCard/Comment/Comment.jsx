import { Avatar, Card, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Meta } = Card;
const { TextArea } = Input;

const CommentWrapper = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Comment = () => {
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  return (
    <>
      <Card style={{ padding: "30px" }} extra="코멘트 목록">
        <CommentWrapper>
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="닉네임"
            description="댓글 뭐라고 쓸까"
            style={{ marginBottom: "20px" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100px",
            }}
          >
            <div>22-10-1</div>
            <div>
              삭제
              <DeleteOutlined />
            </div>
          </div>
        </CommentWrapper>
        <CommentWrapper>
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="닉네임"
            description="댓글 뭐라고 쓸까"
            style={{ marginBottom: "20px" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100px",
            }}
          >
            <div>22-10-1</div>
            <div>
              삭제
              <DeleteOutlined />
            </div>
          </div>
        </CommentWrapper>
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title="닉네임"
          description="댓글 뭐라고 쓸까"
        />
      </Card>
      <TextArea
        showCount
        maxLength={100}
        style={{
          height: 120,
          padding: 30,
          border: "1px solid rgb(242, 243, 246)",
          backgroundColor: "white",
        }}
        onChange={onChange}
      />
    </>
  );
};

export default Comment;
