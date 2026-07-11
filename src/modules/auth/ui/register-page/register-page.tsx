import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import type { AppDispatch } from "../../../../app/store";
import { setAccessToken } from "../../model/authSlice";
import { useRegisterMutation } from "../../api/auth.api";

import { Input } from "../../../../shared/ui/input/input";
import { PageOptions } from "../page-options/page-options";

import styles from "../login-page/login-page.module.css";

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
}

export function RegisterPage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [registerUser, { isLoading, error }] = useRegisterMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const { accessToken } = await registerUser(data).unwrap();

            dispatch(setAccessToken(accessToken));
            navigate("/");
        } catch {
            //
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <PageOptions selectedPage="registration" />

                <div className={styles.greetingFrame}>
                    <h1 className={styles.greetingTitle}>
                        Створення акаунту
                    </h1>

                    <h2 className={styles.greetingSubTitle}>
                        Це займе менше хвилини :)
                    </h2>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.form}
                >
                    <div className={styles.inputs}>
                        <Input
                            variant="light"
                            label="Ім'я"
                            placeholderText="Ваше ім'я"
                            inputType="text"
                            {...register("name", {
                                required: "Ім'я обов'язкове",
                                minLength: {
                                    value: 2,
                                    message:
                                        "Ім'я повинно містити мінімум 2 символи",
                                },
                            })}
                        />

                        {errors.name && (
                            <p className={styles.error}>
                                {errors.name.message}
                            </p>
                        )}

                        <Input
                            variant="light"
                            label="Email"
                            placeholderText="emailexample@gmail.com"
                            inputType="email"
                            {...register("email", {
                                required: "Email обов'язковий",
                                pattern: {
                                    value:
                                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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
                                required: "Пароль обов'язковий",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Пароль повинен містити мінімум 6 символів",
                                },
                            })}
                        />

                        {errors.password && (
                            <p className={styles.error}>
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {error && (
                        <p className={styles.error}>
                            Не вдалося зареєструватися
                        </p>
                    )}

                    <button
                        className={styles.button}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? "Реєстрація..."
                            : "Зареєструватися"}
                    </button>
                </form>

                <p className={styles.switchText}>
                    Вже є акаунт?{" "}
                    <Link
                        className={styles.switchLink}
                        to="/login"
                    >
                        Увійти
                    </Link>
                </p>
            </div>
        </div>
    );
}