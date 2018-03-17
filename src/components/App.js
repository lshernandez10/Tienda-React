//components
import MyHeader from './Header';
import MyContent from './Content';
import SideBar from './SideBar';
import MyFooter from './Footer';


import React, { Component } from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class App extends Component {

  constructor(props) {
          super(props);
          this.state = {
              levelId: null
          };
  };

  myCallback = (dataFromChild) => {
    console.log("data en app", dataFromChild);
    this.setState({ levelId: dataFromChild });
  };

  render() {
    console.log("lev", this.state.levelId);
    return (
      <div className="App">
        <Layout>
          <Header>Header</Header>
          <Layout>
            <Sider><SideBar callbackFromParent={this.myCallback}/></Sider>
            <Content><MyContent levelsId={ Number.parseInt(this.state.levelId, 10)} /></Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
