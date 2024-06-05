import React, { useState, createContext, useEffect } from "react";
import Login from "../components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/Authentication/Firebase/FirebaseApp";
import { useNavigate } from "react-router-dom";
import { User, UserContextProps } from "../constants/TypesAndInterfaces";


const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if(!currentUser){
      navigate("/")
    }
  },[])
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {currentUser ? (
        <>{children}</>
      ) : (
        <Login />
      )}
    </UserContext.Provider>
  );
};

export default UserContext
