import React from "react";
import AuthForm from "./AuthForm";

const ProfileForm = ({handleEdit}) => {
    return (
        <AuthForm btnClick="save changes" onSubmit={handleEdit} showAllInputs={true} editProfile={true} />
    );
};

export default ProfileForm;