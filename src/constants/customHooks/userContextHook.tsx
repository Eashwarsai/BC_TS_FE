import { useContext } from 'react';
import { UserContextProps } from '../TypesAndInterfaces';
import UserContext from '../../context/UserContext';

const useUserContext = (): UserContextProps => {
  const contextValues = useContext<UserContextProps | undefined>(UserContext);
  
  if (contextValues === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  
  return contextValues;
}

export default useUserContext;
