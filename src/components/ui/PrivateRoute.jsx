import React, { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { userService } from '../../services/user.service';
import { Role } from '../../constants/role.constants';

export const PrivateRoute = ({role, children}) => { 
    
    const navigate = useNavigate();
    const user = userService.user();
    console.log("Private route")
    useEffect(() => {

        if (!user){
            userService.logout()
            navigate("/prijava")

        if (!(role === user?.role || user?.role === Role.Admin)){
            navigate("/unauthorized")
        }
    }
    },[user, role, navigate])
   
    return ( 
        <>
            { user && children}
        </>
    )
}
