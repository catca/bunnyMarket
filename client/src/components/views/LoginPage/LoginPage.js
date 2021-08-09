import React, { useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { auth, loginUser } from "../../../_actions/user_actions";
import { modalClose } from '../../../_actions/modal_actions';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import "./LoginPage.css";

function LoginPage(props) {
    const dispatch = useDispatch();
    const { register, watch, formState: { errors }, handleSubmit } = useForm();
    const [formErrorMessage, setFormErrorMessage] = useState('')
    const [loading, setLoading] = useState(false);

    const password = useRef();
    password.current = watch("password");

    const onSubmit = (values) => {
        setTimeout(() => {
            let dataToSubmit = {
                email: values.email,
                password: values.password
            };

            dispatch(loginUser(dataToSubmit))
                .then(response => {
                    if (response.payload.loginSuccess) {
                        dispatch(modalClose());
                        dispatch(auth());
                    } else {
                        setFormErrorMessage('Check out your Account or Password again')
                    }
                })
                .catch(err => {
                    setFormErrorMessage('Check out your Account or Password again')
                    setTimeout(() => {
                        setFormErrorMessage("")
                    }, 3000);
                });
            setLoading(false);
        }, 500);
    }

    return (
        <div className="login-wrapper" style={{height: '400px'}}>
            <div style={{ textAlign: 'center' }}>
                <h3>로그인</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <input
                    type="email"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                />
                {errors.email && <p>This email field is required</p>}

                <label>Password</label>
                <input
                    type="password"
                    {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password && errors.password.type === "required" && <p>This password field is required</p>}
                {errors.password && errors.password.type === "minLength" && <p>Password must have at least 6 characters</p>}

                {formErrorMessage &&
                    <p>{formErrorMessage}</p>
                }

                <input type="submit" disabled={loading} style={{backgroundColor: 'skyblue'}}/>
            </form>
        </div>
    );
};

export default withRouter(LoginPage);


