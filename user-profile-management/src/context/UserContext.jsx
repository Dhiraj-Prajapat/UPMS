/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
import { createContext, useReducer, useEffect } from 'react';

const UserContext = createContext();

const initialState = {
  users: JSON.parse(localStorage.getItem('users')) || [],  // Load from local storage
  changes: [],
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      const updatedUsers = [...state.users, action.payload];
      localStorage.setItem('users', JSON.stringify(updatedUsers));  // Save to local storage
      return { ...state, users: updatedUsers };
    case 'UPDATE_USER':
      const editedUsers = state.users.map(user => user.id === action.payload.id ? action.payload : user);
      localStorage.setItem('users', JSON.stringify(editedUsers));
      return { ...state, users: editedUsers };
    case 'DELETE_USER':
      const filteredUsers = state.users.filter(user => user.id !== action.payload);
      localStorage.setItem('users', JSON.stringify(filteredUsers));
      return { ...state, users: filteredUsers };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(state.users));
  }, [state.users]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
