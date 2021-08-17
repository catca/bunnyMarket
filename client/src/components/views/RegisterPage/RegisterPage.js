import React, { useState, useRef } from "react";
import moment from 'moment'
import { useForm } from 'react-hook-form';
import { registerUser } from "../../../_actions/user_actions";
import { modalOpen } from "../../../_actions/modal_actions";
import { useDispatch } from "react-redux";
import "./RegisterPage.css";

function RegisterPage(props) {
    const dispatch = useDispatch();
    const { register, watch, formState: { errors }, handleSubmit } = useForm();
    // const [errorFromSubmit, setErrorFromSubmit] = useState("")
    const [loading, setLoading] = useState(false);

    const password = useRef();
    password.current = watch("password");

    // const dispatch = useDispatch();

    const onSubmit = (values) => {
        setTimeout(() => {

            let dataToSubmit = {
                email: values.email,
                password: values.password,
                name: values.name,
                lastname: values.lastname,
                image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
            };

            dispatch(registerUser(dataToSubmit)).then(response => {
                console.log(response.payload);
                if (response.payload.success) {
                    props.history.push("/");
                    dispatch(modalOpen());
                } else {
                    if(response.payload.err.code === 11000){
                        alert("중복된 이메일입니다.");
                    }
                }
            })

            setLoading(false);
        }, 500);
    }

    return (

        <div className="auth-wrapper">
            <div style={{ textAlign: 'center' }}>
                <h3>회원가입</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Email</label>
                <input
                    type="email"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                />
                {errors.email && <p>This email field is required</p>}

                <label>Name</label>
                <input
                    {...register("name", { required: true, maxLength: 10 })}
                />
                {errors.name && errors.name.type === "required" && <p>This name field is required</p>}
                {errors.name && errors.name.type === "maxLength" && <p>Your input exceed maximum length</p>}

                <label>Password</label>
                <input
                    type="password"
                    {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password && errors.password.type === "required" && <p>This password field is required</p>}
                {errors.password && errors.password.type === "minLength" && <p>Password must have at least 6 characters</p>}

                <label>Password Confirm</label>
                <input
                    type="password"
                    {...register("password_confirm", {
                        required: true,
                        validate: (value) =>
                            value === password.current
                    })}
                />
                {errors.password_confirm && errors.password_confirm.type === "required" && <p>This password confirm field is required</p>}
                {errors.password_confirm && errors.password_confirm.type === "validate" && <p>The passwords do not match</p>}

                {/* {errorFromSubmit &&
                    <p>{errorFromSubmit}</p>
                } */}

                <input type="submit" disabled={loading} />
            </form>

        </div>
    );
};


export default RegisterPage
