import React, { Component } from "react";
import { Card, Col, Row, Icon, Button, Typography } from "antd";
import styled from "styled-components";

const cards = [
  { name: "Claim Project", icon: "project" },
  { name: "Active Project", icon: "profile" },
  { name: "Completed Projects", icon: "file-protect" },
  { name: "Cancelled Projects", icon: "close-circle" },
  { name: "Notifications", icon: "bell" },
  { name: "Resources", icon: "file-search" },
  { name: "Products", icon: "shop" },
  { name: "Pricing", icon: "money-collect" },
  { name: "Form", icon: "form" },
  { name: "User Details", icon: "idcard" },
];

class CardsCaurosel extends Component {
  state = { tab: 1 };

  handleBackClick = () => {
    this.setState({ tab: this.state.tab - 1 });
  };

  handleForwardClick = () => {
    this.setState({ tab: this.state.tab + 1 });
  };

  render() {
    return (
      <Row type="flex" justify="center" align="middle" gutter={24}>
        <Col>
          <Button onClick={this.handleBackClick} disabled={this.state.tab < 2}>
            <Icon type="left" />
          </Button>
        </Col>
        <Col
          style={{
            overflow: "hidden",
            width: "1100px",
          }}
        >
          <Div
            style={{
              transform: `translateX(-${(this.state.tab - 1) * 75}%)`,
            }}
          >
            {cards.map(({ name, icon }, ind) => (
              <StyledCard
                key={ind}
                bodyStyle={{ textAlign: "center", width: "179px", margin: 20 }}
              >
                <Icon
                  type={icon}
                  style={{
                    fontSize: "24px",
                    display: "block",
                    marginBottom: "32px",
                  }}
                />
                <Typography.Text strong style={{ color: "inherit" }}>
                  {name}
                </Typography.Text>
              </StyledCard>
            ))}
          </Div>
        </Col>
        <Col>
          <Button
            onClick={this.handleForwardClick}
            disabled={this.state.tab > 2}
          >
            <Icon type="right" />
          </Button>
        </Col>
      </Row>
    );
  }
}

const Div = styled.div`
  backgroundcolor: inherit;
  display: flex;
  margin: 64px 0px;
  transition: transform 0.5s ease;
  :hover {
    color: white;
    background-color: #056bcb;
  }
`;
const StyledCard = styled(Card)`
  border-radius: 8px;
  margin: 0px 24px;
  box-shadow: 1px 1px #d4d4d4;
  :hover {
    color: white;
    background-color: #056bcb;
  }
`;

export default CardsCaurosel;
