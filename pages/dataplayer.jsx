import React, { useEffect } from "react";
import { node } from "./api/baseUrl";
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from "react-query";



const getMachines = () =>  node.get('/machines');

const Dataplayer = () => {
    const { data, isLoading, isError } = useQuery(['machines'], getMachines, {
        enabled: true,
    });
    
    if(isLoading){
        return <CircularProgress style={{marginLeft: '50%', marginTop: '30%'}} />
    }

    if(isError){
        return <div style={{marginLeft: "30%"}}>Error</div>
    }

  return (
    <div>
        <div style={{marginLeft: "50%", marginTop:"30%"}}>
            Data Received
        </div>
    </div>
  )
}

export default Dataplayer;