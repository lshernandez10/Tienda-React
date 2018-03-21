//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Button, InputNumber } from 'antd';

import DropdownOrderBy from './DropdownOrderBy.js';
import DropdownAvailability from './DropdownAvailability.js';
import DropdownPrice from './DropdownPrice.js';
import DropdownQuantity from './DropdownQuantity.js';


//Data
import products from '../data/products.json';

//Assets
import './css/Content.css';
import 'antd/dist/antd.less';
class Content extends Component {

  constructor(props) {
    super(props);

    this.state = {
        completeList: null,
        quantity: 1,
        minPrice: null,
        maxPrice: null,
        minQuantity: null,
        maxQuantity: null,
        list: null,
        available: true,
        notAvailable: true
    };

    this.alCarrito = this.alCarrito.bind(this);

  };

  static propTypes = {
    levelsId: PropTypes.number
  };

  orderCallback = (dataFromDropdown) => {
    if (dataFromDropdown == 1) { //Precio
      this.setState((prevState) => ({
        list: prevState.completeList.sort((a, b) => Number.parseInt(a.price.substring(1).replace(",", ""), 10) - Number.parseInt(b.price.substring(1).replace(",", ""), 10))
      }));

    }
    else if (dataFromDropdown == 2) { //Cantidad
      this.setState((prevState) => ({
        list: prevState.completeList.sort((a, b) => b.quantity - a.quantity)
      }));
    }
  }

  priceCallback = (rank) => {
    this.setState((prevState) => ({

      list: prevState.completeList.filter(item =>

        Number.parseInt(item.price.substring(1).replace(",", ""), 10) >= rank[0] && Number.parseInt(item.price.substring(1).replace(",", ""), 10) <= rank[1]
      )

    }));
  }

  quantityCallback = (rank) => {
    this.setState((prevState) => ({
      list: prevState.completeList.filter(item => item.quantity >= rank[0] && item.quantity <= rank[1])
    }));
  }

  availabilityCallback = (key,checked) => {
    if (key === 1){
      if (checked) { //"Disponible" has just been checked => this.state.available is still false
        if(this.state.notAvailable) { // If "No Disponible" is alredy checked
          this.setState((prevState) => ({
            list: prevState.completeList,
            available: true
          }));
        }
        else { // Only "Disponible" is checked
          this.setState((prevState) => ({
            list: prevState.completeList.filter(item => item.available),
            available: true
          }));
        }
      }
      else { //"Disponible" has just been unchecked => this.state.available is still true
        if(this.state.notAvailable) { // If "No Disponible" is alredy checked
          this.setState((prevState) => ({
            list: prevState.list.filter(item => !item.available),
            available: false
          }));
        }
        else { // None is checked
          this.setState((prevState) => ({
            list: [],
            available: false
          }));
        }
      }
    }
    else {
      if (checked) { //"No Disponible" has just been checked => this.state.notAvailable is still false
        if(this.state.available) { // If "Disponible" is alredy checked
          this.setState((prevState) => ({
            list: prevState.completeList,
            notAvailable: true
          }));
        }
        else { // Only "No Disponible" is checked
          this.setState((prevState) => ({
            list: prevState.completeList.filter(item => !item.available),
            notAvailable: true
          }));
        }
      }
      else { //"No Disponible" has just been unchecked => this.state.notAvailable is still true
        if(this.state.available) { // If "Disponible" is alredy checked
          this.setState((prevState) => ({
            list: prevState.list.filter(item => item.available),
            notAvailable: false
          }));
        }
        else { // None is checked
          this.setState((prevState) => ({
            list: [],
            notAvailable: false
          }));
        }
      }
    }
  }

  alCarrito = (id) => {
    this.props.carCallback(id, this.state.quantity);
  };

  onChange = (value) => {
    this.setState({
      quantity: value
    });

};

componentWillReceiveProps = (nextProps) => {
  const id = nextProps.levelsId;

  var completeList = [];
  var minPrice = 999999999;
  var maxPrice = 0;
  var minQuantity = 999999999;
  var maxQuantity = 0;
  for (var product of products) {
    if(product.sublevel_id === id){
      completeList.push(product);
      var price = Number.parseInt(product.price.substring(1).replace(",", ""), 10);
      var quantity = product.quantity;
      if(price <= minPrice) {
        minPrice = price;
      }
      if(price > maxPrice) {
        maxPrice = price;
      }
      if(quantity <= minQuantity) {
        minQuantity = quantity;
      }
      if(quantity > maxQuantity) {
        maxQuantity = quantity;
      }
    }
  }
  this.setState({
    completeList: completeList,
    list: completeList,
    minPrice: minPrice,
    maxPrice: maxPrice,
    minQuantity: minQuantity,
    maxQuantity: maxQuantity
  });

}

  render() {
    const id = this.props.levelsId;

    return (
      <div className="Content">
        { Number.isInteger(id) ? (
          <div>
            <DropdownOrderBy callbackOrder={this.orderCallback} />
            <DropdownPrice minPrice={this.state.minPrice} maxPrice={this.state.maxPrice} callbackPrice={this.priceCallback} />
            <DropdownQuantity minQuantity={this.state.minQuantity} maxQuantity={this.state.maxQuantity} callbackQuantity={this.quantityCallback} />
            <DropdownAvailability callbackAvailability={this.availabilityCallback} />
          </div>

        ) : null }
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Row gutter={16}>
            {
              !id.isNaN && this.state.list != null &&
                this.state.list.map((product) =>
                  id === product.sublevel_id &&
                  <Col key={product.id} span={8}>
                    <Card title={product.name}>
                      <p>Precio= {product.price}</p>
                      <p>Cantidad= {product.quantity}</p>
                      <Button className="Add" type="primary" icon="check" size="default" onClick={(id) => this.alCarrito(product.id, id)}>Añadir al Carrito</Button>
                      <InputNumber min={1} defaultValue={1} onChange={this.onChange}/>
                    </Card>
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
