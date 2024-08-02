import React, { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import ROUTES from '../Settings/ROUTES';
import axiosClient from '../axios-clint';

const UserContext = createContext(null);

const fetchUser = async () => {
  try {
    const res = await axiosClient.get(ROUTES.account.PROFILE);
    if (res?.data) {
      return res.data;
    }
  } catch (err) {
    const { message } = err?.response?.data;
    throw new Error(message);
  }
};

export const UserProvider = ({ children }) => {
  const { data: user, isLoading, error } = useQuery('user', fetchUser);

  if (isLoading) return;
  if (error) return <div>Error loading user data</div>;

  return (
    <UserContext.Provider value={{
      user, 
      isLoading, 
      error,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  return useContext(UserContext);
}