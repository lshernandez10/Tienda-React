//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import products from '../data/products.json';
import Dropdown from './Dropdown.js';

import { Card, Col, Row } from 'antd';



//Assets
import './css/Content.css';

class Content extends Component {

  constructor(props) {
          super(props);
          this.state = {
              list: products
          };
  };

  static propTypes = {
    levelsId: PropTypes.number
  };

  myCallback = (dataFromDropdown) => {

    if (dataFromDropdown == 1) { //Precio
      this.setState({
        list: products.sort((a, b) => Number.parseInt(a.price.substring(1), 10) - Number.parseInt(b.price.substring(1), 10))
      });

    }
    else if (dataFromDropdown == 2) { //Cantidad
      this.setState({
        list: products.sort((a, b) => b.quantity - a.quantity)
      });
    }
  }


  render() {
    const id = this.props.levelsId;
    console.log("id", id);

    return (
      <div className="Content">
        <Dropdown callbackFromContent={this.myCallback} />
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Row gutter={16}>
            {
              id !== NaN &&
                this.state.list.map((product, index) =>
                  id === product.sublevel_id &&
                  <Col span={8}>
                    <Card title={product.name} bordered={false}>{product.price}-{product.quantity}</Card>
                  </Col>
                )
            }
          </Row>
        </div>

      </div>
    );
  }

}

export default Content;
