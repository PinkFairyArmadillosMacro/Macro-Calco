import React, {useState} from "react";
import { Navigate } from "react-router";

const SetUp = () => {

  const [calories,setCalories] = useState(0)
  const [carbs, setCarbs] = useState(0)
  const [proteins, setProteins] = useState(0)
  const [fats, setFats] = useState(0)
  const [isSetUp, setIsSetUp] = useState(true)

  const calsChange = (e) => {setCalories(e.target.value)}
  const carbsChange = (e) => {setCarbs(e.target.value)}
  const proteinsChange = (e) => {setProteins(e.target.value)}
  const fatsChange = (e) => {setFats(e.target.value)}

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSetUp(true)
  }

  return (
    <div id="macro-setup-container">
      <div id="macro-setup-form-container">
      <h1 id="MAcro-title">Set up your desired daily macros:</h1>
        <form id="macro-form-container">
          <input placeholder="Calories" className="input-tag" name='calories' autoComplete="off" onChange={calsChange}></input>
          <input placeholder="Carbs" className="input-tag" name='carbs' onChange={carbsChange}></input>
          <input placeholder="Carbs" className="input-tag" name='proteins' onChange={carbsChange}></input>
          <input placeholder="Carbs" className="input-tag" name='fats' onChange={carbsChange}></input>
          <button id="login-button" type='button' onClick={handleSubmit}>Submit</button>
        </form>
        {isSetUp && (<Navigate to='/home'/>)}
      </div>
    </div>
  )
}

export default SetUp