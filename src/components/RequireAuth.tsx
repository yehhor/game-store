import React, {PropsWithChildren, useContext} from 'react';
import {UserContext} from "./UserContext";
import {Navigate, useLocation} from "react-router-dom";
import {BASE_URL} from "../index";

const RequireAuth = ({children}: { children: JSX.Element }) => {
    const userCtx = useContext(UserContext);
    const location = useLocation();
    if (!userCtx.user)
        return <Navigate to={`${BASE_URL}/login`} state={{from: location}} replace/>;

    return children
};

export default RequireAuth;