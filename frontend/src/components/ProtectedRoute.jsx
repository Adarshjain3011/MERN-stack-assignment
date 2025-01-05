
import { Navigate } from "react-router-dom";

import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {

    // const {loggedIn} = useContext(MyContext);

    const {data,loggedIn} = useSelector((state)=>state.user)

    if(loggedIn){

        return children;

    }
    return <Navigate to="/login"></Navigate>
};

export default ProtectedRoute;

