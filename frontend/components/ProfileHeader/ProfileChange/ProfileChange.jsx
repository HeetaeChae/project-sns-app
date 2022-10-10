import styled from "styled-components";
import { Button, Form, Input } from "antd";
import { useState } from "react";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const ProfileChange = () => {
  const [isChange, setIsChange] = useState(false);
  return (
    <>
      {isChange ? (
        <div style={{ width: "200px", marginLeft: "15px" }}>
          <Form>
            <Form.Item>
              <Input
                size="large"
                placeholder="닉네임을 입력하세요."
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item>
              <Input.TextArea
                size="large"
                rows={4}
                placeholder="자기소개를 입력하세요."
              />
            </Form.Item>
            <ButtonWrapper>
              <Button
                style={{ marginRight: "10px" }}
                onClick={() => setIsChange(false)}
              >
                취소
              </Button>
              <Button type="primary">저장</Button>
            </ButtonWrapper>
          </Form>
        </div>
      ) : (
        <div style={{ width: "200px", marginLeft: "15px" }}>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            닉네임
          </h1>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "500",
              color: "gray",
              marginBottom: "20px",
            }}
          >
            ads1446@naver.com
          </div>
          <div
            style={{
              wordBreak: "break-all",
              color: "gray",
            }}
          >
            dddddddddddddddddddddddddddddddddddddddddddddd
          </div>
          <Button
            onClick={() => setIsChange(true)}
            style={{
              marginTop: "50px",
            }}
          >
            수정
          </Button>
        </div>
      )}
    </>
  );
};

export default ProfileChange;
