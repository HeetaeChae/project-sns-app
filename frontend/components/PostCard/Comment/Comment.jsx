import { Avatar, Card, Input, Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Meta } = Card;
const { TextArea } = Input;

const CommentWrapper = styled.div`
  margin: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DateDeleteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
`;

const Comment = () => {
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
  return (
    <>
      {/* 해당 포스트의 코멘트 갯수 */}
      <Card extra="총 3개의 코멘트">
        {/* 해당 포스트의 코멘트 map으로 렌더링 */}
        <CommentWrapper>
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="닉네임"
            description="댓글 뭐라고 쓸까"
            style={{ marginBottom: "20px" }}
          />
          <DateDeleteWrapper>
            <div>22-10-1</div>
            <Button type="primary">
              <DeleteOutlined />
            </Button>
          </DateDeleteWrapper>
        </CommentWrapper>
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
