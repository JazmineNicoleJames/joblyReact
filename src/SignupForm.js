import React from "react";
import AuthForm from "./AuthForm";

const SignupForm = ({handleSignup}) => {


    return (
        <AuthForm btnClick="signup" onSubmit={handleSignup} showAllInputs={true} />
    );
};

export default SignupForm;
