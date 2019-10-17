import React, { Component } from 'react';

import AppHeader from '../AppHeader/AppHeader';
import SearchPanel from '../SearchPanel/SearchPanel';
import TodoList from '../TodoList/TodoList';
import ItemStatusFilter from '../ItemStatusFilter/ItemStatusFilter';
import ItemAddForm from '../ItemAddForm/ItemAddForm';

import './App.scss';

class App extends Component {
  startId = 100;

  state = {
    todoData: [
      this.createTodoItem('Create React App'),
      this.createTodoItem('Drink Latte'),
      this.createTodoItem('Read Book'),
    ]
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

  render() {
    const doneCount = this.state.todoData.filter((el) => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;

    return (
      <div className="todo-app" >
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={this.state.todoData}
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
