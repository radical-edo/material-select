'use strict';

import Radium from 'radium';
import React from 'react';
import color from 'color';
import _ from 'lodash';

class MaterialSelect extends React.Component {
  render() {
    return (
      <div style={[styles.wrapper]}>
        <input type="text"
          name="material-select_current"
          value={this.state.selectedItem.text}
          onFocus={this.onAction('blur')}
        />
        <div style={[styles.list[this.state.list.state]]}>
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

  onAction(name, ...params) {
    return (...args) => {
      this[`onAction${_.capitalize(name)}`].apply(this, args.concat(params));
    };
  }

  onActionBlur(ev) {
    const list = this.state.list;
    list.state = 'visible';
    this.setState({ list });
  }

  onActionSelect(ev, id, _ev, item) {
    let { list, selectedItem } = this.state;
    list.state = 'hidden';
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
}

const white = '#fff';

const styles = {
  list: {
    visibile: {
      visibility: 'visible'
    },
    hidden: {
      visibility: 'hidden'
    }
  },
  wrapper: {
    display: 'inline-block'
  },
  item: {
    textAlign: 'center',
    padding: '5px',
    borderBottom: `1px solid ${color(white).darken(0.2).hexString()}`
  }
}

export default Radium(MaterialSelect);
