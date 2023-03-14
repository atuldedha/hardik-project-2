import React, { useEffect, useState }  from "react";
import { Link } from "react-router-dom";
import { Button, TextField, CircularProgress } from "rmwc";
import { snackBarQueue } from "./layout";

export const widgetStyles = {width: "100%", marginLeft:"auto", marginRight: "auto", marginTop: "6px"};

export const LoginForm = ({onSubmit=async (data)=>{}}) => {
    return (
        <>
        <GenericForm onSubmit={onSubmit} submitButtonLabel={"Login"}>
            <TextField required outlined label={"Email"} name={"email"} style = {widgetStyles}/>
            <TextField required outlined label={"Password"} type={"password"} name={"password"} style={widgetStyles}/>
        </GenericForm>
        <Link to="/register" style={{textDecoration: "none"}}><Button style={widgetStyles} label={"New User? Sign Up"} outlined/></Link>       
        </>
    );
}

export const RegistrationForm = ({onSubmit=async (data)=>{}}) => {
    return (
        <>
            <GenericForm onSubmit={onSubmit} submitButtonLabel={"Register"}>
                <TextField required outlined label={"Email"} name={"email"} style = {widgetStyles}/>
                <TextField required outlined label={"Password"} type={"password"} name={"password"} style={widgetStyles}/>
                <TextField required outlined label={"Confirm Password"} type={"password"} name={"confirmPassword"} style={widgetStyles}/>
            </GenericForm>
            <Link to="/login" style={{textDecoration: "none"}}><Button style={widgetStyles} label={"Already registered?"} outlined/></Link>       
        </>
    );
}

export const GenericForm = ({children=<></>, onSubmit = async (data)=> {}, submitButtonLabel="Submit"})=> {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=> {
        if((!loading) && (formData !== null)) {
            setLoading(true);
        }
    }, [formData]);

    useEffect(()=> {
        if(loading) {
            if(formData !== null) {
                onSubmit(formData).catch((err)=> {
                    snackBarQueue.notify({
                        title: "Error",
                        body: err.message,
                        dismissesOnAction: true,
                        actions: [
                            {title: "Close"}
                        ]
                    });
                }).finally(()=>setLoading(false));
            }
        }
    }, [loading]);
    return (
        <form onSubmit={(evt)=>{ evt.preventDefault(); setFormData(new FormData(evt.target))}} style={{display: "flex", flexFlow: "column", width: "100%"}}>
            {children}
            {
                loading?
                <Button label={submitButtonLabel} style={widgetStyles} disabled icon={<CircularProgress/>}/>:
                <Button label={submitButtonLabel} style={widgetStyles} raised/>
            }
        </form>
    );
}