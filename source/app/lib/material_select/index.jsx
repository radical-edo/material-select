'use strict';

import Radium from 'radium';
import React from 'react';
import { findDOMNode } from 'react-dom';
import color from 'color';
import _ from 'lodash';

class MaterialSelect extends React.Component {
  render() {
    let height = { height: `${this.getListHeight()}px` };
    if (null == this.itemHeight) {
      height = {};
    }
    return (
      <div style={[styles.wrapper]}>
        <input type="text"
          name="material-select_current"
          readOnly={true}
          value={this.state.selectedItem.text}
          onFocus={this.onAction('focus')}
        />
        <div ref="list" style={[styles.list.box,
          styles.list.effects,
          height,
          styles.list[this.state.list.state]]}>
          {this.renderItems()}
        </div>
      </div>
    );
  }

  renderItems() {
    return this.props.items.map(item => {
      return (
        <div
          key={item.text}
          onClick={this.onAction('select', item)}
          style={[styles.item]}>
          <span>{item.text}</span>
        </div>
      );
    });
  }

  getListHeight(options = {}) {
    let listHeight = 0;
    if ('visible' == this.state.list.state) {
      listHeight += this.itemHeight * this.props.items.length;
    }
    return listHeight;
  }

  onAction(name, ...params) {
    return (...args) => {
      this[`onAction${_.capitalize(name)}`].apply(this, args.concat(params));
    };
  }

  onActionFocus(ev) {
    const list = this.state.list;
    list.state = 'visible';
    list.height = this.getListHeight();
    this.setState({ list });
  }

  onActionSelect(ev, id, _ev, item) {
    let { list, selectedItem } = this.state;
    list.state = 'hidden';
    list.height = 0;
    selectedItem = item;
    this.setState({ list, selectedItem })
  }

  constructor(props) {
    super(props);
    this.state = {
      list: {
        state: 'hidden'
      },
      selectedItem: _.find(this.props.items, item => item.value == props.selectedItem) || _.first(this.props.items)
    };
  }

  componentDidMount() {
    const list = findDOMNode(this.refs.list);
    this.itemHeight = Math.floor(list.offsetHeight / this.props.items.length)
    console.log(this.itemHeight, this.props.items.length, list.offsetHeight);
  }

}

const white = '#fff';
const grey = color(white).darken(.2).hexString();

const styles = {
  list: {
    box: {
      boxShadow: `0px 0px 10px 3px ${grey}`,
      position: 'relative',
      backgroundColor: white
    },
    effects: {
      transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
    },
    visible: {
      opacity: 1
    },
    hidden: {
      opacity: 0
    }
  },
  wrapper: {
    display: 'inline-block'
  },
  item: {
    textAlign: 'center',
    padding: '5px 0'
  }
}

export default Radium(MaterialSelect);
