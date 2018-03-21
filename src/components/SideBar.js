//Dependencies
import { Menu } from 'antd';
import React, { Component } from 'react';
import categories from '../data/categories.json';

//Assets
import './css/SideBar.css';
import 'antd/dist/antd.css';

const SubMenu = Menu.SubMenu;

class SideBar extends Component {
  // submenu keys of first level
  state = {
    openKeys: [],
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);

    this.setState({
      openKeys: openKeys
    });
  }

  onSelectedItem = (openKeys) => {
    console.log("onSelectedItem", openKeys.key);
    this.props.callbackFromParent(openKeys.key);

  }

  render() {
    return (
      <div >
        <Menu
          mode="inline"
          onOpenChange={this.onOpenChange}
          onClick	={this.onSelectedItem}
          style={{ width: '100%', height: '100%'}}
        >
        {
          categories.map((category, key) =>
            <SubMenu key={`Cat-${key}`} title={<span><span>{category.name}</span></span>}>
            {
              category.sublevels.map((subLevel) =>

                subLevel.sublevels !== undefined? ( // If the sublevel has more sublevels
                  <SubMenu key={subLevel.id} title={subLevel.name}>
                  {
                    subLevel.sublevels.map((subSubLevel) =>
                      <Menu.Item key={subSubLevel.id}>{subSubLevel.name}</Menu.Item>
                    )
                  }
                  </SubMenu>
                ):( // else
                  <Menu.Item key={subLevel.id}>{subLevel.name}</Menu.Item>
                )
              )
            }
            </SubMenu>
          )
        }
        </Menu>
      </div>
    );
  }
}

export default SideBar;
