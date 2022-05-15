import  { useState, useEffect } from "react";
import useAxiosPrivate from './hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
     let isMounted = true;
     const controller = new AbortController();
     const getEmployees = async () =>{
     try {
        const response = await axiosPrivate.get("/api/employees", {
            signal: controller.signal
        });
        console.log(response.data);
        isMounted  && setUsers(response.data);
     } catch (error) {
        console.log(error);
        if(error.response.status === 403) navigate("/login", { state: { from: location }, replace: true });
     }
    }
    getEmployees();

     return () =>{
        isMounted = false;
        controller.abort();
     }
    }, [axiosPrivate])
    
    return (
        <article>
            <h2>Employees List</h2>
            {users?.length? (
                <ul>
                    {users.map((user, i) =>(
                        <li key={i}>{user?.name}</li>
                    ))}
                </ul>
            ):
            (
                <p>No employees to display</p>
            )}
        </article>
    )
}

export default Users;