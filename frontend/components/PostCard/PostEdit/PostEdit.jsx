import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button, Card, Input, notification } from "antd";
import {
  EditOutlined,
  EditTwoTone,
  DeleteOutlined,
  PictureOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { EDIT_POST } from "../../../store/modules/post";

import ImageUpload from "../../ImageUpload/ImageUplaod";
import ImageZoom from "../PostImage/ImageZoom/ImageZoom";

const imageUploadCheck = () => {
  notification.open({
    message: "이미지 확인",
    description: "이미지를 업로드 한 후 클릭해주세요.",
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#e91010",
        }}
      />
    ),
  });
};

const PostEdit = ({ post, setIsEdit }) => {
  const dispatch = useDispatch();

  const [editText, setEditText] = useState(post.content);
  const [editImage, setEditImage] = useState([...post.image]);
  const [open, setOpen] = useState(false);

  const cancelEditPost = () => {
    setIsEdit(false);
  };
  const onChangeEditText = useCallback(
    (e) => {
      setEditText(e.target.value);
    },
    [editText]
  );
  const onClickImageOpen = useCallback(() => {
    if (editImage.length === 0) {
      return imageUploadCheck();
    }
    setOpen(true);
  }, [editImage]);

  const editPost = useCallback(() => {
    const data = {
      _id: post._id,
      content: editText,
      image: editImage,
    };
    axios.post("http://localhost:7000/api/post/editPost", data).then((res) => {
      if (res.data.success) {
        dispatch({ type: EDIT_POST, payload: res.data.doc });
      } else {
        console.log(res.data);
      }
    });
  }, [editImage, editText]);

  return (
    <Card
      title={
        <div style={{ fontSize: "20px" }}>
          <EditTwoTone /> 포스트 수정
        </div>
      }
      extra={
        <Button onClick={onClickImageOpen}>
          <PictureOutlined />
          이미지 확인
        </Button>
      }
      cover={
        <div style={{ padding: "24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <Input.TextArea
              style={{ height: "150px" }}
              showCount
              maxLength={300}
              onChange={onChangeEditText}
              value={editText}
            />
          </div>
          <ImageUpload image={editImage} setEditImage={setEditImage} />
        </div>
      }
      actions={[
        <>
          <Button onClick={cancelEditPost} style={{ marginRight: "10px" }}>
            <EditOutlined key="취소" />
            취소
          </Button>
          <Button type="primary" onClick={editPost}>
            <DeleteOutlined key="완료" />
            완료
          </Button>
        </>,
      ]}
    >
      {open && <ImageZoom open={open} setOpen={setOpen} image={editImage} />}
    </Card>
  );
};

export default PostEdit;
