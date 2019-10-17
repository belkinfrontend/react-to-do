import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ItemAddForm.scss'

class ItemAddForm extends Component {

    state = {
        label: ''
    }

    onLabelChange = (e) => {
        console.log(e.target.value);
        this.setState({
            label: e.target.value
        });


    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);

        this.setState({
            label: ''
        });
    }

    render() {
        return (
            <form
                className="item-add-form d-flex"
                onSubmit={this.onSubmit}
            >
                <input
                    type="text"
                    className="form-control"
                    value={this.state.label}
                    onChange={this.onLabelChange}
                />
                <button
                    className="btn btn-outline-secondary"
                >
                    Add Item
                </button>
            </form>
        );
    }
}

ItemAddForm.propTypes = {

};

export default ItemAddForm;