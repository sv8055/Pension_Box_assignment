import React, { createContext, useReducer } from 'react'
import { SIGN_IN_USER, SIGN_OUT_USER } from './authTypes'
import { reducer } from './authReducer'
import { useHistory } from 'react-router-dom';
import mockData from '../../mock/mockData.json'
const initialState = {
  isSignedIn: false,
  user: null
}

export const AuthContext = createContext()

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const history = useHistory();
  
  const loginUser = ({ email, username, password }) => {
    const user = mockData.users.find((user) => ((user.username=== username || user.email === email) && user.password === password));
    if(user) {
      dispatch(
        {
        type: SIGN_IN_USER, 
        payload: {
          email,
          username,
          password
        }
      })
      history.push('/orders');
    } else {
      // User is logged out
      dispatch({type: SIGN_OUT_USER})
    }
  }
  const logoutUser = () => {
    dispatch({type: SIGN_OUT_USER})
  }
  return <AuthContext.Provider 
            value={{
              isSignedIn: state.isSignedIn,
              user: state.user,
              login: loginUser,
              logout: logoutUser,
            }}>{props.children}</AuthContext.Provider>
}