import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import FlexView from "react-flexview";
import Receipt from "./Receipt";
import Header from "./Header";

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      items: [], //variable that handles initial import
      sum: 0,
      initialized: false,
      collection: []
    };
  }
  componentDidMount() {
    axios.get(process.env.PUBLIC_URL + "reciept_data.json").then(res => {//import json
      this.setState({ items: res.data });
      this.populate(); //populate list of receipts
    });
  }
  add(pdf, store, date, price, category, description) {//adds the imported file into the list of receipts
    let group = this.state.collection;
    let money = this.state.sum;
    group.push(
      <Receipt
        store={store}
        price={price}
        date={date}
        category={category}
        description={description}
        pop={this.pop.bind(this)}
        id={this.state.collection.length}
        key={this.state.collection.length}
        pdf={pdf}
      />)
    money = Number(money) + Number(price);
    money = money.toFixed(2)
    this.setState({
      collection: group,
      sum: money
    });

  }
  pop(id) { //removes the selected item from the list of receipts
    let group = [];
    var money = this.state.sum;
    for (let i = 0; i < this.state.collection.length; i++) {
      if (id !== this.state.collection[i].props.id) {
        group.push(this.state.collection[i]);
      }
      else {
        money = money - this.state.collection[i].props.price;
      }
    }
    money = Number(money.toFixed(2));
    console.log(money)
    this.setState({
      collection: group,
      sum: money
    });
  }
  populate() {//Initialization of list of receipts into component Receipts
    var collection = [];
    var money = 0;

    for (var i = 0; i < this.state.items.length; i++) {
      var pdf = true;
      if (this.state.items[i].file.type !== "application/pdf") pdf = false;
      collection.push(
        <Receipt
          show={true}
          store={this.state.items[i].name}
          price={this.state.items[i].total}
          date={this.state.items[i].date}
          category={this.state.items[i].category}
          description={this.state.items[i].description}
          pop={this.pop.bind(this)}
          id={i}
          key={i}
          pdf={pdf}
        />
      );
      money = money + this.state.items[i].total;
    }
    money = Number(money.toFixed(2));
    this.setState({
      collection: collection,
      sum: money,
      initialized: true
    });
  }
  render() {
    return (
      <div>
        <Header total={this.state.sum} add={this.add.bind(this)} />
        <FlexView wrap marginLeft="1em">
          {this.state.collection}
        </FlexView>
      </div>
    );
  }
}
