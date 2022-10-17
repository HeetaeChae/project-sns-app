import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Button, Card, Input } from "antd";
import {
  EditOutlined,
  MessageFilled,
  MessageOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const PostEdit = ({ post, setIsEdit }) => {
  const [editText, setEditText] = useState(post.content);

  const cancelEditPost = () => {
    setIsEdit(false);
  };

  const onChangeEditText = useCallback(
    (e) => {
      setEditText(e.target.value);
    },
    [editText]
  );

  return (
    <Card
      cover={
        <>
          <div style={{ padding: "24px" }}>
            <Input.TextArea
              style={{ height: "150px" }}
              showCount
              maxLength={300}
              onChange={onChangeEditText}
              value={editText}
            />
          </div>
          <div>으앙</div>
        </>
      }
      actions={[
        <>
          <Button onClick={cancelEditPost} style={{ marginRight: "10px" }}>
            <EditOutlined key="취소" />
            취소
          </Button>
          <Button type="primary">
            <DeleteOutlined key="완료" />
            완료
          </Button>
        </>,
      ]}
    ></Card>
  );
};

export default PostEdit;
