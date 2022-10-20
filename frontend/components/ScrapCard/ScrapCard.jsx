import { InfoCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, List, notification, Result } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import styled from "styled-components";

const deleteScrapSuccess = () => {
  notification.open({
    message: "스크랩",
    description: "스크랩을 삭제했습니다.",
    icon: (
      <InfoCircleOutlined
        style={{
          color: "#108ee9",
        }}
      />
    ),
  });
};

const ScrapInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px 0;
  height: 100%;
  width: 100%;
`;

const ScrapCard = ({ scraps, setDeleteScrap }) => {
  console.log(scraps);
  const user = useSelector((state) => state.user);

  const deleteScrap = (scrapId) => {
    const variable = { scrapId };
    axios
      .post("http://localhost:7000/api/scrap/deleteScrap", variable)
      .then((res) => {
        if (res.data.success) {
          deleteScrapSuccess();
          setDeleteScrap(scrapId);
        } else {
          console.l0g(res.data.err);
        }
      });
  };
  if (scraps.length === 0) {
    return (
      <div
        style={{
          height: "65vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Result
          title={`${user.me.nickname}님의 스크랩이 없습니다.`}
          subTitle="스크랩을 추가해주세요."
        />
      </div>
    );
  } else {
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={scraps}
        footer={
          <div>
            <span
              style={{ color: "#108ee9", fontSize: "16px", fontWeight: "700" }}
            >
              {user.me.nickname}
            </span>
            님의 스크랩 목록
          </div>
        }
        renderItem={(scrap) => (
          <List.Item
            key={scrap._id}
            extra={
              scrap.postId.image.length !== 0 && (
                <img
                  width={300}
                  alt="postImage"
                  src={`http://localhost:7000/${scrap.postId.image[0]}`}
                />
              )
            }
          >
            <ScrapInfoWrapper>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`http://localhost:7000/${scrap.postId.writer.image}`}
                  />
                }
                title={scrap.postId.writer.nickname}
                description={scrap.postId.writer.email}
              />
              <List.Item.Meta
                title={scrap.postId.content}
                description={
                  <Button
                    style={{ marginTop: "25px" }}
                    onClick={() => deleteScrap(scrap._id)}
                    type="primary"
                    danger
                  >
                    <DeleteOutlined /> 스크랩 삭제
                  </Button>
                }
              />
            </ScrapInfoWrapper>
          </List.Item>
        )}
      />
    );
  }
};

export default ScrapCard;
