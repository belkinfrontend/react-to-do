import React, { Component } from 'react';

import AppHeader from '../AppHeader/AppHeader';
import SearchPanel from '../SearchPanel/SearchPanel';
import TodoList from '../TodoList/TodoList';
import ItemStatusFilter from '../ItemStatusFilter/ItemStatusFilter';
import ItemAddForm from '../ItemAddForm/ItemAddForm';

import './App.scss';
import { relative } from 'path';

class App extends Component {
  startId = 100;

  state = {
    todoData: [
      this.createTodoItem('Create React App'),
      this.createTodoItem('Drink Latte'),
      this.createTodoItem('Read Book'),
    ],
    searchText: '',
    filter: 'all'
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.startId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter(elem => elem.id !== id);

      return {
        todoData: newArr
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    //===== add new item in array

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex((element) => element.id === id);

    //===== update object
    const oldItem = arr[index];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    //===== create new array
    return [
      ...arr.slice(0, index),
      newItem,
      ...arr.slice(index + 1)
    ];
  }

  onToggleImportant = (id) => {
    console.log('onToggleImportant', id);

    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  };

  onToggleDone = (id) => {
    console.log('onToggleDone', id);

    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  };

  onSearchedItems = (searchText) => {
    this.setState({ searchText });
  };
  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  searchItems(items, searchText) {
    if (searchText.length === 0) {
      return items;
    }
    return items.filter((item) => {
      return item.label.toLowerCase().includes(searchText.toLowerCase());
    });
  };

  filterItems(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  render() {
    const visibleItems = this.filterItems(
      this.searchItems(this.state.todoData, this.state.searchText),
      this.state.filter
    );
    const doneCount = this.state.todoData.filter((el) => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;

    return (
      <div className="todo-app" >
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchedItems={this.onSearchedItems} />
          <ItemStatusFilter
            filter={this.state.filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    )

  }
};

export default App;
