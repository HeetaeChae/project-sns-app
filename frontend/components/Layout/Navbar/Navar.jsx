import { useCallback } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Button, Badge, Tag } from "antd";
import { useSelector } from "react-redux";
import { StarTwoTone } from "@ant-design/icons";

const Navbar = () => {
  const scrapCount = useSelector((state) => state.scrap);
  console.log(scrapCount);
  return (
    <>
      <Link href="/">
        <a>
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: "95px", height: "70px" }}
          />
        </a>
      </Link>
      <Link href="/scrap">
        <a>
          <Badge count={scrapCount}>
            <Tag
              color="processing"
              style={{ fontSize: "18px", padding: "5px" }}
            >
              <StarTwoTone /> 스크랩
            </Tag>
          </Badge>
        </a>
      </Link>
    </>
  );
};

export default Navbar;
