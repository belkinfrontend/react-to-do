import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ItemStatusFilter.scss';

class ItemStatusFilter extends Component {

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' }
  ];

  render() {
    const buttons = this.buttons.map((button) => {
      const isActive = this.props.filter === button.name;
      const classCurrent = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button type="button"
          className={`btn ${classCurrent}`}
          key={button.name}
          onClick={() => this.props.onFilterChange(button.name)}
        >
          {button.label}
        </button>
      )
    })
    return (
      <div className="btn-group">

        {buttons}
      </div>
    );
  }
}

ItemStatusFilter.propTypes = {

};

export default ItemStatusFilter;
