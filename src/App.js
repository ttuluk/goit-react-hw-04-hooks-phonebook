import React, { Component } from "react";
import Form from "./components/Form/Form";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Phonebook</h1>
        <Form />
      </div>
    );
  }
}

export { App };
