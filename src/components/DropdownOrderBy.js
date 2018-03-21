import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon, message } from 'antd';

import './css/Button.css';

class DropdownOrderBy extends Component {

  onSelectedItem = (openKeys) => {
    console.log("drp", openKeys.key);
    this.props.callbackOrder(openKeys.key);

  }

  render() {

    const menu = (
      <Menu
        onClick	={this.onSelectedItem}
      >
        <Menu.Item key="1">Precio</Menu.Item>
        <Menu.Item key="2">Cantidad</Menu.Item>
      </Menu>
    );

    return(
      <div >
        <div>
          <Dropdown overlay={menu}>
            <Button ghost className="DropdownButton" type="primary">
              Ordernar por <Icon type="down" />
            </Button>
          </Dropdown>
        </div>
      </div>
    );

  }

}

export default DropdownOrderBy;
