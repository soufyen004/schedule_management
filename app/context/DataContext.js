"use client"

import { createContext, useEffect, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [participants, setParticipants] = useState([]);

    const addParicipant = (participant)=>{
        setParticipants( prev=> [...prev,participant] )
    }

    const removeParticipant = (participant)=>{
        setParticipants( participants=> participants.filter((p,i)=> p.email !== participant.email ) )
    }

    useEffect(()=>{
        console.log("updated:",participants)
    },[participants])

  return (
    <DataContext.Provider value={{ participants ,addParicipant ,removeParticipant}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;