import React, {useState} from "react";
import { Navigate } from "react-router";

const SetUp = (props) => {

  const [calories,setCalories] = useState(0)
  const [carbs, setCarbs] = useState(0)
  const [proteins, setProteins] = useState(0)
  const [fats, setFats] = useState(0)
  const [isSetUp, setIsSetUp] = useState(false)

  const calsChange = (e) => {setCalories(e.target.value)}
  const carbsChange = (e) => {setCarbs(e.target.value)}
  const proteinsChange = (e) => {setProteins(e.target.value)}
  const fatsChange = (e) => {setFats(e.target.value)}

  const handleSubmit = async (e) => {
    //if (carbs+proteins+fats !== 100) return
    e.preventDefault();
    console.log(calories, carbs, proteins, fats)
    // make a post request to /signup
    // send username, password, calorieGoal, proteinGoal, carbGoal, fatGoal
    const body = {
      username: props.username,
      password: props.password,
      caloriesGoal: calories,
      proteinGoal: proteins,
      carbGoal: carbs,
      fatGoal: fats,
    }
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    setIsSetUp(true)
    props.setLogged(true);
  }

  return (
    <div id="macro-setup-container">
      <div id="macro-setup-form-container">
        <h1 id="Macro-title">Set up your desired daily macros:</h1>
        <form id="macro-form-container">
          <input placeholder="Calories" className="input-tag" name='calories' autoComplete="off" onChange={calsChange} required></input>
          <input placeholder="Carbs (%)" className="input-tag" name='carbs' autoComplete="off" onChange={carbsChange} required></input>
          <input placeholder="Protein (%)" className="input-tag" name='proteins' autoComplete="off" onChange={proteinsChange} required></input>
          <input placeholder="Fats (%)" className="input-tag" name='fats' autoComplete="off" onChange={fatsChange} required></input>
          <p id="macros-subtext">*Carbs, Proteins, and Fats must total to 100%
          </p>
          <button id="login-button" type='button' onClick={handleSubmit}>Submit</button>
        </form>
        {isSetUp && (<Navigate to='/home'/>)}
      </div>
    </div>
  )
}

export default SetUp