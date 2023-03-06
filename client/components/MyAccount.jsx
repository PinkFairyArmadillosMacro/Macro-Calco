import React from 'react';
import { useState, useEffect } from 'react';
import RecipeCollection from './RecipeCollection.jsx';

const MyAccount = (props) => {

  const [calories,setCalories] = useState(0)
  const [carbs, setCarbs] = useState(0)
  const [proteins, setProteins] = useState(0)
  const [fats, setFats] = useState(0)
  const [isSetUp, setIsSetUp] = useState(false)

  const calsChange = (e) => {setCalories(e.target.value)}
  const carbsChange = (e) => {setCarbs(e.target.value)}
  const proteinsChange = (e) => {setProteins(e.target.value)}
  const fatsChange = (e) => {setFats(e.target.value)}

  const handleUpdateMacros = (e) => {
    //if (carbs+proteins+fats !== 100) return
    e.preventDefault();
    console.log(calories, carbs, proteins, fats)
    setIsSetUp(true)
  }

  return (
    <div className="my-account-container">
      <div className="macro-update-form-container">
        <h1 id="Macro-title">Update your desired daily macros:</h1>
        <form className="macro-update-form">
          <input placeholder="Calories" className="input-tag" name='calories' autoComplete="off" onChange={calsChange} required></input>
          <p className='current-update-macro-total'> Current Calories: 2000 </p>
          <input placeholder="Carbs (%)" className="input-tag" name='carbs' autoComplete="off" onChange={carbsChange} required></input>
          <p className='current-update-macro-total'> Current Carbs: 2000 </p>
          <input placeholder="Protein (%)" className="input-tag" name='proteins' autoComplete="off" onChange={proteinsChange} required></input>
          <p className='current-update-macro-total'> Current Protein: 2000 </p>
          <input placeholder="Fats (%)" className="input-tag" name='fats' autoComplete="off" onChange={fatsChange} required></input>
          <p className='current-update-macro-total'> Current Fats: 2000 </p>
          <p id="macros-subtext">*Carbs, Proteins, and Fats must total to 100%
          </p>
          <button id="login-button" type='button' onClick={handleUpdateMacros}>Submit</button>
        </form>
        {isSetUp && (<Navigate to='/home'/>)}
      </div>
    </div>
  )
}

export default MyAccount;