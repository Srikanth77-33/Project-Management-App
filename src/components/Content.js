import React from "react";
import { Layout } from "antd";
import TableComp from "./TableComp";
import CardsCaurosel from "./CardsCaurosel";

const { Content: Body } = Layout;

const Content = () => {
  return (
    <Body style={{ margin: "16px" }}>
      <TableComp />
      <CardsCaurosel />
    </Body>
  );
};

export default Content;
