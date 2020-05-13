import _ from "lodash";
import React, { useState } from "react";
import styled from "styled-components";

import {
  Icon,
  Menu,
  Sidebar,
  Responsive
} from "semantic-ui-react";

const StyledMenu = styled.div`
position:fixed;
width:100vw;
height:100vh;
top:0;
left:0;


`
const PageContent = styled.div`
margin-top:5em;`



const NavBarMobile = ({
  leftItems,
  onPusherClick,
  onToggle,
  rightItems,
  visible,
  children
}) => (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted

        vertical
        visible={visible}
      >
        {_.map(leftItems, item => <Menu.Item {...item} />)}
      </Sidebar>
      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
        style={{ minHeight: "100vh" }}
      >
        {children}
      </Sidebar.Pusher>
      <Menu fixed="top" inverted>
        <Menu.Item onClick={onToggle}>
          <Icon name="sidebar" />
        </Menu.Item>
        <Menu.Menu position="right">
          {_.map(rightItems, item => <Menu.Item {...item} />)}
        </Menu.Menu>
      </Menu>
    </Sidebar.Pushable>
  );

const NavBarDesktop = ({ leftItems, rightItems }) => (
  <Menu fixed="top" inverted>
    {_.map(leftItems, item => <Menu.Item {...item} />)}
    <Menu.Menu position="right">
      {_.map(rightItems, item => <Menu.Item {...item} />)}
    </Menu.Menu>
  </Menu>
);


const MenuBar = ({ leftItems, rightItems, children }) => {
  const [visible, setVisible] = useState(false)
  // const [visible, setVisible] = useState(false)


  const handlePusher = () => {
    visible && setVisible(false);
  };

  const handleToggle = () => setVisible(!visible);


  return (
    <StyledMenu visible={visible}>
      <Responsive {...Responsive.onlyMobile}>
        <NavBarMobile
          leftItems={leftItems}
          onPusherClick={handlePusher}
          onToggle={handleToggle}
          rightItems={rightItems}
          visible={visible}
        >  <PageContent>{children}</PageContent>
        </NavBarMobile>
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
        <PageContent>{children}</PageContent>
      </Responsive>
    </StyledMenu>
  );
}




export default MenuBar


