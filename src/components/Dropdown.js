import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon, message } from 'antd';


class MyDropdown extends Component {

  onSelectedItem = (openKeys) => {
    console.log("drp", openKeys.key);
    this.props.callbackFromContent(openKeys.key);

  }

  render() {



    const menu = (
      <Menu
        onClick	={this.onSelectedItem}
        style={{ width: 256 }}
      >
        <Menu.Item key="1">Precio</Menu.Item>
        <Menu.Item key="2">Cantidad</Menu.Item>
      </Menu>
    );

    return(
      <div className="Dropdown">
        <div>
          <Dropdown overlay={menu}>
            <Button style={{ marginLeft: 8 }}>
              Button <Icon type="down" />
            </Button>
          </Dropdown>
        </div>
      </div>
    );

  }

}

export default MyDropdown;
