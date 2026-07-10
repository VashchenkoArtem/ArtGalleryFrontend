import { useState } from "react";
import type { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import type { AppDispatch } from "../../../../app/store";
import { Button } from "../../../../shared/ui/button/button";
import { useLoginMutation, useLoginWithGoogleMutation } from "../../api/auth.api";
import styles from "./login-page.module.css";
import { setAccessToken } from "../../model/auth-slice";

export function LoginPage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [login, { isLoading, error }] = useLoginMutation();
    const [loginWithGoogle] = useLoginWithGoogleMutation();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const { accessToken } = await login({ email, password }).unwrap();
            dispatch(setAccessToken(accessToken));
            navigate("/");
        } catch {
        }
    };

    const handleGoogleSuccess = async (credential: string) => {
        try {
            const { accessToken } = await loginWithGoogle({ idToken: credential }).unwrap();
            dispatch(setAccessToken(accessToken));
            navigate("/");
        } catch {
            
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.title}>Вхід до акаунту</h1>

                <form className={styles.form} onSubmit={handleSubmit}>
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
                            Не вдалося увійти. Перевірте email і пароль.
                        </p>
                    )}

                    <Button
                        type="submit"
                        variant="grey"
                        fontSize="var(--fs-profile-btn)"
                        text={isLoading ? "Вхід..." : "Увійти"}
                        disabled={isLoading}
                    />
                </form>

                <div className={styles.divider}>або</div>

                <GoogleLogin
                    onSuccess={(res) => {
                        if (res.credential) handleGoogleSuccess(res.credential);
                    }}
                    onError={() => {
                        // GoogleLogin сам покажет консольную ошибку; для UI
                        // достаточно молча остаться на форме
                    }}
                />

                <p className={styles.switchText}>
                    Немає акаунту?{" "}
                    <Link className={styles.switchLink} to="/register">Зареєструватися</Link>
                </p>
            </div>
        </div>
    );
}