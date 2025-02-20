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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div>
          <Button onClick={this.handleBackClick} disabled={this.state.tab < 2}>
            <Icon type="left" />
          </Button>
        </div>
        <div
          style={{
            overflow: "hidden",
            width: "805px",
          }}
        >
          <Div
            style={{
              transform: `translateX(-${(this.state.tab - 1) * 100}%)`,
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
        </div>
        <div>
          <Button
            onClick={this.handleForwardClick}
            disabled={this.state.tab > 2}
          >
            <Icon type="right" />
          </Button>
        </div>
      </div>
    );
  }
}

const Div = styled.div`
  background-color: inherit;
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
