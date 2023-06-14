import "./App.css";
import { Layout, Space } from "antd";
import Body from "./components/Body";

const { Header, Footer, Content } = Layout;

function App() {
  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor: "#7dbcea",
  };
  const contentStyle = {
    minHeight: 120,
    lineHeight: "120px",
  };

  const footerStyle = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#7dbcea",
  };
  return (
    <div className="App">
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
        size={[0, 48]}
      >
        <Layout>
          <Header style={headerStyle}>Header</Header>
          <Content style={contentStyle}>
            <Body />
          </Content>
          <Footer style={footerStyle}>Footer</Footer>
        </Layout>
      </Space>
    </div>
  );
}

export default App;
