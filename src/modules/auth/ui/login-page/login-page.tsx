import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";

import type { AppDispatch } from "../../../../app/store";
import { setAccessToken } from "../../model/authSlice";
import { useLoginMutation, useLoginWithGoogleMutation } from "../../api/auth.api";

import styles from "./login-page.module.css";
import type { LoginFormData } from "./login-page.types";
import { PageOptions } from "../page-options/page-options";
import { Input } from "../../../../shared/ui/input/input";



export function LoginPage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // const [login, { isLoading, error }] = useLoginMutation();
    const [login] = useLoginMutation()
    const [loginWithGoogle] = useLoginWithGoogleMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const { accessToken } = await login(data).unwrap();

            dispatch(setAccessToken(accessToken));
            navigate("/");
        } catch {
            //
        }
    };

    const handleGoogleSuccess = async (credential: string) => {
        try {
            const { accessToken } = await loginWithGoogle({
                idToken: credential,
            }).unwrap();

            dispatch(setAccessToken(accessToken));
            navigate("/");
        } catch {
            //
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <PageOptions selectedPage="login"/>
                <div className={styles.greetingFrame}>
                    <h1 className={styles.greetingTitle}>Раді тебе знову бачити!</h1>
                    <h2 className={styles.greetingSubTitle}>Увійдіть, щоб отримати більше можливостей на сайті</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.inputs}>
                        <Input
                            variant="light"
                            label="Email"
                            placeholderText="emailexample@gmail.com"
                            inputType="email"
                            {...register("email", {
                                required: "Email обов'язковий",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Некоректний email",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className={styles.error}>
                                {errors.email.message}
                            </p>
                        )}
                        <Input
                            variant="light"
                            label="Пароль"
                            placeholderText="Введіть пароль"
                            inputType="password"
                            {...register("password", {
                                required: "Пароль обов'язковий"
                            })}
                        />
                        {errors.password && (
                            <p className={styles.error}>
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <button className={styles.button} type="submit">Увійти</button>
                </form>
                <div className={styles.divider}>або</div>

                <GoogleLogin
                    onSuccess={(res) => {
                        if (res.credential) {
                            handleGoogleSuccess(res.credential);
                        }
                    }}
                    onError={() => {}}
                />
                <p className={styles.switchText}>
                    Ще немає акаунту?{" "}
                    <Link
                        className={styles.switchLink}
                        to="/registration"
                    >
                        Зареєструватися
                    </Link>
                </p>
            </div>
        </div>
    );
}