import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button, Card, Input, notification, Modal } from "antd";
import {
  EditTwoTone,
  PictureOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

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
const editPostSuccess = () => {
  notification.open({
    message: "포스트 수정",
    description: "포스트를 수정했습니다.",
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#108ee9",
        }}
      />
    ),
  });
};

const EditImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const EditMessageStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

const PostEdit = ({ post, setIsEdit }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [editText, setEditText] = useState(post.content);
  const [editImage, setEditImage] = useState([...post.image]);
  //삭제할 이미지를 받아와서 삭제할 용도
  const [deleteImage, setDeleteImage] = useState("");
  //수정완료 확인 모달창 띄우는 용도
  const [isModalOpen, setIsModalOpen] = useState(false);
  //이미지 확인용 imageZoom 컴포넌트 모달창 띄우는 용도
  const [open, setOpen] = useState(false);

  //이미지 줌 모달창을 띄우는 함수
  const onClickImageOpen = useCallback(() => {
    if (editImage.length === 0) {
      return imageUploadCheck();
    }
    setOpen(true);
  }, [editImage]);

  //post content부분 작성하는 함수
  const onChangeEditText = useCallback(
    (e) => {
      setEditText(e.target.value);
    },
    [editText]
  );

  //포스트를 수정하는 함수
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

  //수정 완료 확인 모달창 관련 함수
  const onClickModalOk = async () => {
    //포스트를 수정하는 함수 실행
    await editPost();
    //포스트 완료 메시지 띄움
    await editPostSuccess();
    //포스트 수정을 닫음
    setIsEdit(false);
  };

  //이미지를 삭제하는 함수
  useEffect(() => {
    const deletedEditImage = editImage.filter((image) => {
      return image !== deleteImage;
    });
    setEditImage([...deletedEditImage]);
  }, [deleteImage]);

  return (
    <>
      <Card
        title={<div>포스트 수정</div>}
        extra={
          <EditImageWrapper>
            <ImageUpload image={editImage} setEditImage={setEditImage} />
            <Button onClick={onClickImageOpen} style={{ marginLeft: "10px" }}>
              <PictureOutlined />
              이미지 확인
            </Button>
          </EditImageWrapper>
        }
        cover={
          <div style={{ padding: "24px" }}>
            <Input.TextArea
              style={{ height: "150px" }}
              showCount
              maxLength={300}
              onChange={onChangeEditText}
              value={editText}
            />
          </div>
        }
        actions={[
          <>
            <Button
              onClick={() => setIsEdit(false)}
              style={{ marginRight: "10px" }}
            >
              취소
            </Button>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              완료
            </Button>
          </>,
        ]}
      >
        <EditMessageStyle>
          <Button type="dashed" shape="round">
            <EditTwoTone /> 포스트 수정 중...
          </Button>
        </EditMessageStyle>
      </Card>
      {open && (
        <ImageZoom
          open={open}
          setOpen={setOpen}
          image={editImage}
          editImage="true"
          setDeleteImage={setDeleteImage}
        />
      )}
      {isModalOpen && (
        <Modal
          centered
          title="포스트 수정"
          open={isModalOpen}
          onOk={onClickModalOk}
          onCancel={() => setIsModalOpen(false)}
          footer={[
            <Button onClick={() => setIsModalOpen(false)}>아니오</Button>,
            <Button onClick={onClickModalOk} type="primary">
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
              정말 포스트를 수정하시겠습니까? <br />
              수정한 포스트는 복구할 수 없습니다.
            </span>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PostEdit;
