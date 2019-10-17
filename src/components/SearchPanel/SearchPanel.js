import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchPanel.scss';


class SearchPanel extends Component {
  render() {
    return (
      <input type="text"
        className="form-control search-input"
        placeholder="type to search" />
    );
  }
}

SearchPanel.propTypes = {

};

export default SearchPanel;
