//Dependencies
import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon, message, Checkbox } from 'antd';

import './css/Button.css';


class Availability extends Component {

  onChange = (key,e) => {
    console.log(`checked = ${key}, ${e.target.checked}`);
    this.props.callbackAvailability(key, e.target.checked);
  }


  render(){

    const menu = (
      <Menu >
        <Menu.Item key="1">
          <Checkbox defaultChecked onChange={(key) => this.onChange(1, key)}>Disponible</Checkbox>
        </Menu.Item>
        <Menu.Item key="2">
          <Checkbox defaultChecked onChange={(key) => this.onChange(0, key)}>No Disponible</Checkbox>
        </Menu.Item>

      </Menu>
    );
    return(
      <div className="DropdownPrice">
        <Dropdown overlay={menu}>
          <Button ghost className="DropdownButton" type="primary">
            Disponibilidad <Icon type="down" />
          </Button>
        </Dropdown>
      </div>

    );
  }
}

export default Availability;
