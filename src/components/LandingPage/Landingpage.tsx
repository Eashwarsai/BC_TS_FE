import React from "react";
import { Layout, Menu, MenuProps, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { NavIcons, SliderFeilds } from "../../constants/Constants";
import { LogoutOutlined } from "@ant-design/icons";
import "./LandingPage.css";
import AllRoutes from "../AllRoutes";
import { signOut } from "firebase/auth";
import { auth } from "../Authentication/Firebase/FirebaseApp";
import axios from "axios";
import useUserContext from "../../constants/customHooks/userContextHook";
const { Header, Content, Footer, Sider } = Layout;

const LandingPage :  React.FC  = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation : string = location.pathname.split("/").slice(-1)[0];
  console.log(currentLocation);
  const { currentUser, setCurrentUser } = useUserContext();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items1 : MenuProps['items'] = NavIcons.map((key) => ({
    key: key,
    label: `${key} Events`,
    onClick: () => {
      navigate(`/home/${key}`);
    },
  }));
  const items2 : MenuProps['items']  = SliderFeilds
  .filter(({ key }) => key !== "admin" || currentUser?.is_admin)
  .map(({ icon, key }) => ({
    key,
    icon: React.createElement(icon),
    label: key,
    onClick: () => {
      navigate(`/${key}`);
    },
  }));
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <h1> BeautifulCode </h1>
        {location.pathname.indexOf("/home") !== -1 ? (
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[currentLocation]}
            items={items1}
            style={{
              flex: 1,
              minWidth: 0,
              margin: "0 1rem",
            }}
          />
        ) : (
          ""
        )}
        <div
          style={{
            color: "white",
            marginRight: 0,
            marginLeft: "auto",
            cursor: "pointer",
          }}
          onClick={async () => {
            try{
              await signOut(auth);
              setCurrentUser(null);
              await axios.get('/logout')
              navigate('/')
            }catch(e){
              console.log("error ",e)
            }
            
          }}
        >
          <LogoutOutlined /> Logout
        </div>
      </Header>
      <Content
        style={{
          margin: "2rem 0",
          padding: "0 3rem",
          backgroundColor: "aliceblue",
        }}
      >
        <Layout
          style={{
            minHeight: "78vh",
            background: colorBgContainer,
            borderRadius: "0.5rem",
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={
                location.pathname.indexOf("/home") !== -1
                  ? ["home"]
                  : [currentLocation]
              }
              style={{
                minHeight: "100%",
                padding: "24px 0",
                borderRadius: borderRadiusLG,
              }}
              items={items2}
            />
          </Sider>
          <Content
            style={{
              padding: "24px",
              minHeight: "100%",
            }}
          >
            <AllRoutes />
          </Content>
        </Layout>
      </Content>
      <Footer className="footer">
        Design ©{new Date().getFullYear()} Created by Eashwarsai
      </Footer>
    </Layout>
  );
};
export default LandingPage;
