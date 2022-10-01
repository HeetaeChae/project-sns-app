import { useCallback } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Input } from "antd";

const { Search } = Input;

const Navbar = () => {
  const onSearch = useCallback(() => {}, []);
  return (
    <>
      <Link href="/">
        <a>
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: "60px", height: "60px" }}
          />
        </a>
      </Link>
      <Search
        placeholder="내용을 입력하세요."
        allowClear
        enterButton="검색"
        size="large"
        onSearch={onSearch}
        style={{
          width: 600,
        }}
      />
    </>
  );
};

export default Navbar;
