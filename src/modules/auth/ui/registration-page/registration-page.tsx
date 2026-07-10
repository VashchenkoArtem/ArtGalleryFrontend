import { useState } from "react";
import type { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../../../app/store";
import { Button } from "../../../../shared/ui/button/button";
import { useRegisterMutation } from "../../api/auth.api";
// стили формы идентичны login-page — переиспользуем, чтобы не дублировать CSS
import styles from "../login-page/login-page.module.css";
import { setAccessToken } from "../../model/auth-slice";

export function RegisterPage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [register, { isLoading, error }] = useRegisterMutation();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const { accessToken } = await register({ name, email, password }).unwrap();
            dispatch(setAccessToken(accessToken));
            navigate("/");
        } catch {
            // ошибка отобразится ниже через `error`
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>Реєстрація</h1>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="name">Ім'я</label>
                        <input
                            id="name"
                            type="text"
                            required
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            required
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="password">Пароль</label>
                        <input
                            id="password"
                            type="password"
                            required
                            minLength={6}
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <p className={styles.error}>
                            Не вдалося зареєструватися. Можливо, такий email вже зайнятий.
                        </p>
                    )}

                    <Button
                        type="submit"
                        variant="grey"
                        fontSize="var(--fs-profile-btn)"
                        text={isLoading ? "Реєстрація..." : "Зареєструватися"}
                        disabled={isLoading}
                    />
                </form>

                <p className={styles.switchText}>
                    Вже є акаунт?{" "}
                    <Link className={styles.switchLink} to="/login">Увійти</Link>
                </p>
            </div>
        </div>
    );
}