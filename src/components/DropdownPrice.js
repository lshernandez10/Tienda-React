//Dependencies
import React, { Component } from 'react';
import { Slider } from 'antd';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button, Icon, message } from 'antd';


class DropdownPrice extends Component {

  constructor(props) {
    super(props);
  };

  static propTypes = {
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number
  };

  onChange = (rank) => {
    this.props.callbackPrice(rank);
  }

  render() {
    const {minPrice, maxPrice} = this.props;

    var marks = {};
    marks[minPrice] = `$${minPrice}`;
    marks[maxPrice] = `$${maxPrice}`;


    const menu = (
      <Menu style={{ width: '250px'}} >
        <Menu.Item key="1">
          <Slider range
          marks = {marks}
          defaultValue = {[minPrice, maxPrice]}
          max = {maxPrice}
          min = {minPrice}
          onChange	= {this.onChange} />
        </Menu.Item>
      </Menu>
    );
    return(
      <div className="DropdownPrice">
        <Dropdown overlay={menu}>
          <Button style={{ marginLeft: 8 }}>
            Precio <Icon type="down" />
          </Button>
        </Dropdown>
      </div>

    );

  }

}

export default DropdownPrice;
