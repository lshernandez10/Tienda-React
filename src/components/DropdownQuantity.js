//Dependencies
import React, { Component } from 'react';
import { Slider } from 'antd';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button, Icon, message } from 'antd';

import './css/Button.css';

class DropdownQuantity extends Component {

  constructor(props) {
    super(props);
  };

  static propTypes = {
    minQuantity: PropTypes.number,
    maxQuantity: PropTypes.number
  };

  onChange = (rank) => {
    this.props.callbackQuantity(rank);
  }

  render() {
    const {minQuantity, maxQuantity} = this.props;

    var marks = {};
    marks[minQuantity] = minQuantity;
    marks[maxQuantity] = maxQuantity;


    const menu = (
      <Menu style={{ width: '250px'}} >
        <Menu.Item key="1">
          <Slider range
          marks = {marks}
          defaultValue = {[minQuantity, maxQuantity]}
          max = {maxQuantity}
          min = {minQuantity}
          onChange	= {this.onChange} />
        </Menu.Item>
      </Menu>
    );
    return(
      <div className="DropdownPrice">
        <Dropdown overlay={menu}>
          <Button ghost className="DropdownButton" type="primary">
            Cantidad <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

export default DropdownQuantity;
