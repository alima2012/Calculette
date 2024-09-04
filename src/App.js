import './App.css';
import { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';

function App() {
  const [preState, setPreState] = useState("")
  const [curState, setCurState] = useState("")
  const [input, setInput] = useState("0")
  const [operator, setOperator] = useState(null)
  const [total, setTotal] = useState(false)

  const inputNumber = (e) => {
    if (curState.includes(".") && e.target.innerText === ".") return;

    if(total){
      setPreState("");
    }

    curState 
        ? setCurState((pre) => pre + e.target.innerText)
        : setCurState(e.target.innerText);
    setTotal(false);
  };

  useEffect(() => {
    setInput(curState)
  }, [curState]);

  useEffect(() => {
    setInput("0");
  }, []);

  const operatorType = (e) => { 
    setTotal(false)
    setOperator(e.target.innerText)
    if(curState === "") return 
    if(preState !== "") {
      equals()
    }else{
      setPreState(curState);
      setCurState("");
    }  
  };
  const equals = (e) => {
    if(e?.target.innerText === "="){
      setTotal(true)
  };

  let cal 
  switch (operator){
    case "/":
      cal = String(parseFloat(preState) / parseFloat(curState));
      break;
    case "+":
      cal = String(parseFloat(preState) + parseFloat(curState));
      break;
    case "X":
      cal = String(parseFloat(preState) * parseFloat(curState));
      break;
    case "-":
      cal = String(parseFloat(preState) - parseFloat(curState));
      break;
      default:
        return 
  } 
    setInput("")
    setPreState(cal)
    setCurState("")
  }

  const plusOumoins = () => {
    if(curState.charAt(0) === "-"){
      setCurState(curState.substring(1));
    }else {
      setCurState("-" + curState);
    }
  }

  const percent = () => {
    preState ? setCurState(String(parseFloat(curState) / 100 * 
    preState)) : setCurState(String(parseFloat(curState) /100));
  };

  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
  }
  
  return (
    <div className="container">
      <div className="content">
         <div className="fond_ecran">
          {input !== "" || input === "0" ? (
            <NumericFormat
              value={input} 
              displayType={"text"}
              thousandSeparator={true} />
            ) : (
            <NumericFormat 
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
              /> 
            )}
          </div>
         <div className="btn light-gray" onClick={reset}>AC</div>
         <div className="btn light-gray" onClick={percent}>%</div>
         <div className="btn light-gray" onClick={plusOumoins}>+/-</div>
         <div className="btn operator" onClick={operatorType}>/</div>
         <div className="btn" onClick={inputNumber}>7</div>
         <div className="btn" onClick={inputNumber}>8</div>
         <div className="btn" onClick={inputNumber}>9</div>
         <div className="btn operator" onClick={operatorType}>X</div>
         <div className="btn" onClick={inputNumber}>4</div>
         <div className="btn" onClick={inputNumber}>5</div>
         <div className="btn" onClick={inputNumber}>6</div>
         <div className="btn operator" onClick={operatorType}>+</div>
         <div className="btn" onClick={inputNumber}>1</div>
         <div className="btn" onClick={inputNumber}>2</div>
         <div className="btn" onClick={inputNumber}>3</div>
         <div className="btn operator" onClick={operatorType}>-</div>
         <div className="btn zero" onClick={inputNumber}>0</div>
         <div className="btn" onClick={inputNumber}>.</div>
         <div className="btn" onClick={equals}>=</div>     
      </div>     
    </div>
  );
}

export default App;
