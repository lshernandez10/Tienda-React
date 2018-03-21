//Components
import MyHeader from './Header';
import MyContent from './Content';
import SideBar from './SideBar';

//Dependencies
import React, { Component } from 'react';
import { Layout } from 'antd';

//Assets
import './css/Footer.css';

const { Header, Footer, Sider, Content } = Layout;

class App extends Component {

  constructor(props) {
          super(props);
          this.state = {
              levelId: null, //Selected category id
              itemId: null,  //Added product to the cart
              quantity: null  //Quantity of the added product
          };
  };

  siderCallback = (dataFromChild) => {
    this.setState({ levelId: dataFromChild });
  };

  cartCallback = (id, q) => {
    this.setState({
      itemId: id,
      quantity: q
    });
  };

  render() {

    return (
      <div className="App">
        <Layout>
          <Header><MyHeader itemId={this.state.itemId} quantity={this.state.quantity} /></Header>
          <Layout>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
            ><SideBar callbackFromParent={this.siderCallback}/></Sider>
            <Content><MyContent levelsId={ Number.parseInt(this.state.levelId, 10)} carCallback={this.cartCallback}/></Content>
          </Layout>
          <Footer className="Footer">Tiendas "El Baratón" ©2018 Created by Sofía</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
