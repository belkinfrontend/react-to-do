import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchPanel.scss';


class SearchPanel extends Component {
  state = {
    searchText: ''
  }
  onSearchedItems = (e) => {
    this.setState({
      searchText: e.target.value
    });
    this.props.onSearchedItems(this.state.searchText);
    console.log(this.state.searchText);
    console.log(e.target.value);

  };
  render() {
    return (
      <input type="text"
        className="form-control search-input"
        placeholder="type to search"
        value={this.state.searchText}
        onChange={this.onSearchedItems}
      />
    );
  }
}

SearchPanel.propTypes = {

};

export default SearchPanel;
