import React from 'react';
import { useState, useEffect } from 'react';
import RecipeCollection from './RecipeCollection.jsx';

const MyAccount = (props) => {

  const [calories,setCalories] = useState(0)
  const [carbs, setCarbs] = useState(0)
  const [proteins, setProteins] = useState(0)
  const [fats, setFats] = useState(0)
  const [isSetUp, setIsSetUp] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
 
  const [user, setUser] = useState({
    username: '',
    calorieGoal: 0,
    fatGoal: 0,
    proteinGoal: 0,
    carbsGoal: 0
  })

  useEffect(()=> {
    const getUser = async () => {
      let response = await fetch ('/api/user/myaccount');
      response = await response.json();
      console.log(response)
      setUser(response);
    }
    getUser();
  }, [isSetUp])

  const calsChange = (e) => {setCalories(e.target.value)}
  const carbsChange = (e) => {setCarbs(e.target.value)}
  const proteinsChange = (e) => {setProteins(e.target.value)}
  const fatsChange = (e) => {setFats(e.target.value)}

  const handleUpdateMacros = async (e) => {
    //if (carbs+proteins+fats !== 100) return
    e.preventDefault();
    setUser({
      calorieGoal: calories,
      fatGoal: fats,
      proteinGoal: proteins,
      carbsGoal: carbs
    })
    const sendUpdates = await fetch('/api/user/updatemacros', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        calorieGoal: calories,
        fatGoal: fats,
        proteinGoal: proteins,
        carbsGoal: carbs
      })
    })
    setIsSetUp(!isSetUp);
  }

  // username: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  // collections: [{ type: Schema.Types.ObjectId, ref: 'collection' }],
  // calorieGoal: Number,
  // fatGoal: Number,
  // carbsGoal: Number,
  // proteinGoal: Number,

  /*
    we are making a get request to /api/user/myaccount
    /api/user/updatemacros
  */

  return (
    <div className="my-account-container">
      <div className="macro-update-form-container">
        <h1 id="Macro-title">Update your desired daily macros:</h1>
        <form className="macro-update-form">
          <input placeholder="Calories" className="input-tag" name='calories' autoComplete="off" onChange={calsChange} required></input>
          <p className='current-update-macro-total'> Current Calories: <b>{user.calorieGoal}</b> </p>
          <input placeholder="Carbs (%)" className="input-tag" name='carbs' autoComplete="off" onChange={carbsChange} required></input>
          <p className='current-update-macro-total'> Current Carbs: <b>{user.carbsGoal}</b> </p>
          <input placeholder="Protein (%)" className="input-tag" name='proteins' autoComplete="off" onChange={proteinsChange} required></input>
          <p className='current-update-macro-total'> Current Protein: <b>{user.proteinGoal}</b> </p>
          <input placeholder="Fats (%)" className="input-tag" name='fats' autoComplete="off" onChange={fatsChange} required></input>
          <p className='current-update-macro-total'> Current Fats: <b>{user.fatGoal}</b> </p>
          <p id="macros-subtext">*Carbs, Proteins, and Fats must total to 100%
          </p>
          <button id="myaccount-button" type='button' onClick={handleUpdateMacros}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default MyAccount;