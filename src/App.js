import React from 'react';
import './App.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import CardView from './views/CardView';
import { mainReducer } from './reducers'

const initialStore = {
  cards: [
    {
      key: "c1",
      title: 'Card 1',
      text: 'This is a text of the first card.',
      pos: { x: "10px", y: "10px" }
    },
    {
      key: "c2",
      title: 'Card 2',
      text: 'This is a text of the first card.',
      pos: { x: "350px", y: "10px" }
    }
  ]
}

const store = createStore(mainReducer, initialStore)

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <CardView />
      </Provider>
    </div>
  );
}

export default App;
