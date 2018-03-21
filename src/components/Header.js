//Dependencies
import React, { Component } from 'react';
import { Popover, Button } from 'antd';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import products from '../data/products.json';


//Assets
import './css/Header.css';


class MyHeader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      dataSource: []
    }

  };

  static propTypes = {
    itemId: PropTypes.string,
    quantity: PropTypes.number
  };


  hide = () => {
    this.setState({
      visible: false,
    });
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }

  componentWillReceiveProps = (nextProps) => {
    const id = nextProps.itemId;
    const quantity = nextProps.quantity;

    if (id !== null && quantity !== null){
      const item = products.find( product => product.id === id );
      const dataSource = this.state.dataSource;

      var repeated = false;
      for (const x of dataSource) {
        if (x.key == id) {
          x.quantity= x.quantity + quantity;
          repeated = true;
          this.setState({
            dataSource: dataSource,
          });
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

        this.setState({
          dataSource: [...dataSource, newData],
        });
      }
    }

  }

  render() {
    const id = this.props;

    const columns = [
      { title: 'Nombre Producto', dataIndex: 'name', key: 'name' },
      { title: 'Precio', dataIndex: 'price', key: 'price' },
      { title: 'Cantidad', dataIndex: 'quantity', key: 'quantity' },
      { dataIndex: '', key: 'x', render: () => <a href="#">Delete</a> },
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
          <p>Total a pagar:</p>
          <Button type="primary" size="large" >Comprar</Button>
        </div>
      </div>
    );

    return(
      <div className="Header">
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
      </div>
    );
  }
}

export default MyHeader;
