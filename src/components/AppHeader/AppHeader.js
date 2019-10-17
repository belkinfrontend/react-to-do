import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AppHeader.scss';


class AppHeader extends Component {
  render() {
    const { toDo, done } = this.props;
    console.log(this.props);

    return (
      <div className="app-header d-flex">
        <h1>Todo List</h1>
        <h2>{toDo} more to do, {done} done</h2>
      </div>
    );
  }
}

AppHeader.propTypes = {

};

export default AppHeader;