//Dependencies
import React, { Component } from 'react';
import { Popover, Button } from 'antd';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import products from '../data/products.json';
import { Popconfirm } from 'antd';


//Assets
import './css/Header.css';

class MyHeader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false, //Popover visibility
      dataSource: [], //Array with the items in the cart
      total: 0 // Total amount to pay
    }

  };

  static propTypes = {
    itemId: PropTypes.string,
    quantity: PropTypes.number
  };

  // Hide the popover
  hide = () => {
    this.setState({
      visible: false,
    });
  }

  //
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }

  componentWillReceiveProps = (nextProps) => {
    const id = nextProps.itemId;
    const quantity = nextProps.quantity;

    if (id !== null && quantity !== null){ // If the props were set
      const item = products.find( product => product.id === id );
      const dataSource = this.state.dataSource;
      var repeated = false;

      //If the item is alredy in the cart, just increase the amount
      const price = Number.parseInt(item.price.substring(1).replace(",", ""), 10);
      for (const x of dataSource){
        if (x.key == id) {
          x.quantity = x.quantity + quantity;
          repeated = true;
          this.setState((prevState) => ({
            total: prevState.total + price*quantity
          }));
          break;
        }
      }

      if (!repeated) {
        const newData = {
          key: id,
          name: item.name,
          price: item.price,
          quantity: quantity,
        };

        this.setState((prevState) => ({
          dataSource: [...dataSource, newData],
          total: prevState.total + price*quantity
        }));
      }
    }
  } // componentWillReceiveProps

  comprar = () => {
    this.setState({
      total: 0,
      dataSource: []
    });
  }

  cancel = (x) => {
      console.log("Cancelarr", x);
  }

  confirm = (x) => {
      console.log("Confirmar", x);
  }


  render() {
    const id = this.props;

    const columns = [
      { title: 'Nombre Producto', dataIndex: 'name', key: 'name' },
      { title: 'Precio', dataIndex: 'price', key: 'price' },
      { title: 'Cantidad', dataIndex: 'quantity', key: 'quantity' },
      { dataIndex: '', key: 'x', render: () => (
        <Popconfirm title="Desea eliminar el item del carrito?" onConfirm={this.confirm} onCancel={this.cancel} okText="Si" cancelText="No">
          <a href="#">Delete</a>
        </Popconfirm>
      ) },
    ];

    const content = (
      <div>
        <div>
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
          />
        </div>
        <br />
        <div>
          <p>Total a pagar: ${this.state.total}</p>
          <Button type="primary" size="large" onClick={this.comprar}>Comprar</Button>
        </div>
      </div>
    );

    return(
      <div className="CartButton">
        <Popover
                title="Tu Orden"
                trigger="click"
                content={content}
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
              >
              <Button type="primary" shape="circle" icon="shopping-cart" size="large" />
        </Popover>
      </div>
    );
  }
}

export default MyHeader;
