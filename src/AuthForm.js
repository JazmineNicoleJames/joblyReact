import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ btnClick, onSubmit, showAllInputs, editProfile }) => {

/*     const INITIAL_STATE = {
        username: "jazzz",
        password: "ilovecats",
        firstName: "Jaz",
        lastName: "James",
        email: "fake@fake.com"
    } */

    const INITIAL_STATE = {
        username: "",
        password:"",
        firstName:"",
        lastName:"",
        email:""
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const navigate = useNavigate();

    const handleChange = evt => {
        const {name, value} = evt.target;
        setFormData(fData => ({
            ...fData,
            [name] : value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        await onSubmit(formData);
        navigate("/", {state: {welcomeMessage: `Welcome, ${formData.firstName}`}});
        setFormData(INITIAL_STATE);
    };

    return (
        <form onSubmit={handleSubmit}>
            {!editProfile && (
                <>
            <label htmlFor="username">Username</label>
            <input type="text" value={formData.username} name="username" onChange={handleChange} autoComplete="off" />
            </>
            )}
            <label htmlFor="password">Password</label>
            <input type="password" value={formData.password} name="password" onChange={handleChange} autoComplete="off"/>
            {showAllInputs && (
            <>
            <label htmlFor="firstName">First name</label> 
            <input type="text" value={formData.firstName} name="firstName" onChange={handleChange} />
            <label htmlFor="lastName">Last name</label> 
            <input type="text" value={formData.lastName} name="lastName" onChange={handleChange} />
            <label htmlFor="email">Email</label> 
            <input type="text" value={formData.email} name="email" onChange={handleChange} />
            </>
            )}
            <button>{btnClick}</button>
        </form>
    );
};

export default AuthForm;