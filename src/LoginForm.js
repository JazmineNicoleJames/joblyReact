import React from "react";
import AuthForm from "./AuthForm";

const LoginForm = ({handleLogin}) => {

    return (
        <AuthForm btnClick="login" onSubmit={handleLogin} showAllInputs={false} />
    );
};

export default LoginForm;