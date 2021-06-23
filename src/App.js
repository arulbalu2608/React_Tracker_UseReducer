import React, { useReducer, useState } from "react";
import { Row, Col, Button, Input, Table } from "reactstrap";
import "./App.css";

const initial = {
  balance: 0,
  income: 0,
  expense: 0,
  arr: [],
  amount: 0,
};

const Reducer = (state, action) => {
  switch (action.type) {
    case "Add_Income":
      return {
        ...state,
        balance: state.balance + parseInt(action.Amount),
        income: state.income + parseInt(action.Amount),
        arr: state.arr.concat({
          id: action.id,
          title: action.Title,
          amount: action.Amount,
        }),
      };

    case "Add_Expense":
      return {
        ...state,
        balance: state.balance + parseInt(action.Amount),
        expense: state.expense + parseInt(action.Amount),
        arr: state.arr.concat({
          id: action.id,
          title: action.Title,
          amount: action.Amount,
        }),
      };
    case "Delete":
      const am = state.arr.find((ar) => {
        if (ar.id === action.id) return ar.amount;
      });
      if (am.amount > 0) {
        return {
          ...state,
          arr: state.arr.filter((ar) => ar.id !== action.id),
          balance: state.balance - Math.abs(am.amount),
          income: state.income - am.amount,
        };
      } else {
        return {
          ...state,
          arr: state.arr.filter((ar) => ar.id !== action.id),
          balance: state.balance + Math.abs(am.amount),
          expense: state.expense - am.amount,
        };
      }

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(Reducer, initial);
  const [Title, setTitle] = useState("");
  const [Amount, setAmount] = useState("");

  const calculation = () => {
    if (Title && Amount) {
      if (Amount > 0) {
        dispatch({
          type: "Add_Income",
          id: Date.now(),
          Title,
          Amount,
        });
      } else {
        dispatch({
          type: "Add_Expense",
          id: Date.now(),
          Title,
          Amount,
        });
      }
    } else {
      alert("Enter correct value");
    }
  };
  return (
    <div className="App">
      <h1 className="title">Tracker</h1>
      <div>
        <div className="container">
          <h3>Balance</h3>
          <h5 className="Balance">₹{state.balance}</h5>
        </div>
        <br />

        <div className="Income">
          <div className="container">
            <Row>
              <Col>
                <h3>Income</h3>
                <h5 className="Inc">₹{state.income}</h5>
              </Col>
              <Col>
                <h3>Expense</h3>
                <h5 className="Exp">₹{state.expense}</h5>
              </Col>
            </Row>
          </div>
        </div>

        <div className="container form">
          <Input
            type="text"
            name="title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <br />
          <Row>
            <Col>
              <Input
                type="number"
                name="amount"
                value={Amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
              />
            </Col>
            <Col>
              <Button color="primary" onClick={calculation}>
                Add
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <div className="List">
        <h1 className="listtitle">List of Items</h1>
        <Table dark>
          <tbody>
            {state.arr.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.title}</td>
                  <td> {val.amount}</td>
                  <td className={val.amount > 0 ? "Pos" : "Neg"}>
                    <i
                      className="far fa-trash-alt"
                      onClick={() => {
                        dispatch({ type: "Delete", id: val.id });
                      }}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
