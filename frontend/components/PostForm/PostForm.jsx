import { useCallback, useState } from "react";
import { Input, Button, Card, notification, Modal } from "antd";
import {
  UploadOutlined,
  PictureOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import ImageUpload from "../ImageUpload/ImageUplaod";
import ImageZoom from "../PostCard/PostImage/ImageZoom/ImageZoom";
import { useSelector } from "react-redux";
import day from "../../hook/day";
import { ADD_POST } from "../../store/modules/post";
import { useDispatch } from "react-redux";

const { TextArea } = Input;

const PostForm = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { me } = user;

  const [postText, setPostText] = useState("");
  const [image, setImage] = useState([]);
  const [open, setOpen] = useState(false);
  const [addPostModal, setAddPostModal] = useState(false);

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
  const postTextCheck = () => {
    notification.open({
      message: "포스트 등록",
      description: "포스트 글을 다섯글자 이상 작성해주세요.",
      icon: (
        <InfoCircleOutlined
          style={{
            color: "#e91010",
          }}
        />
      ),
    });
  };
  const addPostSuccess = () => {
    notification.open({
      message: "포스트 등록",
      description: "포스트를 성공적으로 등록하였습니다.",
      icon: (
        <InfoCircleOutlined
          style={{
            color: "#10e910",
          }}
        />
      ),
    });
  };
  const onChangePostText = useCallback(
    (e) => {
      setPostText(e.target.value);
    },
    [postText]
  );
  const handleOk = () => {
    setAddPostModal(false);
    if (postText.length < 5) {
      return postTextCheck();
    }
    addPost();
  };
  const handleCancel = () => {
    setAddPostModal(false);
  };
  const addPost = useCallback(() => {
    const data = {
      writer: me._id,
      content: postText,
      image: image,
      date: day(),
    };
    axios.post("http://localhost:7000/api/post/addPost", data).then((res) => {
      if (res.data.success) {
        addPostSuccess();
        setPostText("");
        setImage([]);
        dispatch({ type: ADD_POST, payload: [res.data.doc] });
      } else {
        console.log(res.data);
      }
    });
  }, [image, postText, me]);
  const onClickImageOpen = useCallback(() => {
    if (image.length === 0) {
      return imageUploadCheck();
    }
    setOpen(true);
  }, [image]);
  return (
    <>
      <Card
        title="새 포스트 작성하기"
        extra={
          <Button onClick={onClickImageOpen}>
            <PictureOutlined />
            이미지 확인
          </Button>
        }
        style={{ marginBottom: "50px" }}
        actions={[
          <ImageUpload image={image} setImage={setImage} />,
          <Button type="primary" onClick={() => setAddPostModal(true)}>
            <UploadOutlined />
            포스트 등록!
          </Button>,
        ]}
      >
        <TextArea
          showCount
          maxLength={300}
          style={{
            height: 150,
          }}
          onChange={onChangePostText}
          value={postText}
        />
      </Card>
      <Modal
        title="포스트 등록"
        open={addPostModal}
        onOk={handleOk}
        onCancel={handleCancel}
        centered="true"
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            취소
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            네
          </Button>,
        ]}
      >
        <div style={{ fontSize: "18px", textAlign: "center" }}>
          <span style={{ color: "rgb(64, 169, 255)" }}>{me.nickname}</span>
          님, 포스트를 등록 하시겠습니까?
        </div>
      </Modal>
      {open && <ImageZoom open={open} setOpen={setOpen} image={image} />}
    </>
  );
};

export default PostForm;
