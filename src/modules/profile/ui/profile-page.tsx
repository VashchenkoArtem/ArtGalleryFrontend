import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { SerializedError } from "@reduxjs/toolkit";
import styles from "./profile-page.module.css";
import { useMeQuery, useUpdateUserMutation } from "../api/profile.api";
import { useLogoutMutation } from "../../auth/api/auth.api";
import type { AppDispatch } from "../../../app/store";
import type { ProfileFormData } from "./profile-page.types";
import { setAccessToken } from "../../auth/model/authSlice";
import { getApiErrorMessage } from "../../../shared/tools/get-api-error";
import { CLOUDINARY_URL } from "../../../shared/constants/server";
import { Button } from "../../../shared/ui/button/button";

const MAX_AVATAR_SIZE = 5 * 1024 * 1024 

export function ProfilePage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { data: user, isLoading: isUserLoading } = useMeQuery();
    const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
    const [updateProfile, { isLoading: isSavingProfile }] = useUpdateUserMutation();
    const [updateAvatar, { isLoading: isUploadingAvatar }] = useUpdateUserMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [profileError, setProfileError] = useState<string | null>(null);
    const [avatarError, setAvatarError] = useState<string | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormData>({ mode: "onBlur" });

    // Коли дані користувача підʼїхали (або оновилися після сейву) —
    // підтягуємо їх у форму як значення за замовчуванням
    useEffect(() => {
        if (user) {
            reset({ name: user.name, email: user.email });
        }
    }, [user, reset]);

    // Чистимо локальний preview-URL, щоб не текла памʼять
    useEffect(() => {
        return () => {
            if (avatarPreview) URL.revokeObjectURL(avatarPreview);
        };
    }, [avatarPreview]);

    const handleLogout = async () => {
        await logout();
        dispatch(setAccessToken(null));
        navigate("/login");
    };

    const handleStartEditing = () => {
        setProfileError(null);
        setIsEditing(true);
    };

    const handleCancelEditing = () => {
        setProfileError(null);
        if (user) reset({ name: user.name, email: user.email });
        setIsEditing(false);
    };

    const onSubmit = async (data: ProfileFormData) => {
        setProfileError(null);
        try {
            await updateProfile(data).unwrap();
            setIsEditing(false);
        } catch (error) {
            setProfileError(getApiErrorMessage(error as FetchBaseQueryError | SerializedError));
        }
    };

    const handleAvatarClick = () => {
        avatarInputRef.current?.click();
    };

    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        event.target.value = "";
        if (!file) return;

        setAvatarError(null);

        if (!file.type.startsWith("image/")) {
            setAvatarError("Дозволені лише файли зображень");
            return;
        }
        if (file.size > MAX_AVATAR_SIZE) {
            setAvatarError("Розмір файлу не повинен перевищувати 5МБ");
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        setAvatarPreview(previewUrl);

        try {
            await updateAvatar({ avatar: file }).unwrap();
        } catch (error) {
            setAvatarError(getApiErrorMessage(error as FetchBaseQueryError | SerializedError));
        } finally {
            setAvatarPreview(null);
        }
    };

    if (isUserLoading || !user) {
        return <div className={styles.status}>Завантаження...</div>;
    }

    const isGoogleAccount = Boolean(user.googleId);
    const displayedAvatar = avatarPreview ?? (user.avatar ? `${CLOUDINARY_URL}/${user.avatar}` : null);

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <div className={styles.avatarCard}>
                    <div className={styles.avatarWrap}>
                        {displayedAvatar ? (
                            <img className={styles.avatar} src={displayedAvatar} alt="" />
                        ) : (
                            <div className={styles.avatarPlaceholder}>
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                        {isUploadingAvatar && (
                            <div className={styles.avatarOverlay}>
                                <span className={styles.spinner} aria-hidden="true" />
                            </div>
                        )}
                    </div>

                    <input
                        ref={avatarInputRef}
                        type="file"
                        accept="image/*"
                        className={styles.hiddenFileInput}
                        onChange={handleAvatarChange}
                    />
                    <Button
                        variant="white"
                        fontSize="1rem"
                        text="Редагувати аватар"
                        isLoading={isUploadingAvatar}
                        onClick={handleAvatarClick}
                    />
                    {avatarError && <p className={styles.error}>{avatarError}</p>}
                </div>

                <div className={styles.infoCard}>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="profile-name">Ім'я</label>
                            {isEditing ? (
                                <input
                                    id="profile-name"
                                    type="text"
                                    className={`${styles.input} ${errors.name ? styles.inputInvalid : ""}`}
                                    disabled={isSavingProfile}
                                    {...register("name", {
                                        required: "Введіть ім'я",
                                        maxLength: { value: 100, message: "Ім'я повинно містити менше 100 символів" },
                                    })}
                                />
                            ) : (
                                <p className={styles.valueBox}>{user.name}</p>
                            )}
                            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="profile-email">Email</label>
                            {isEditing ? (
                                <input
                                    id="profile-email"
                                    type="email"
                                    className={`${styles.input} ${errors.email ? styles.inputInvalid : ""}`}
                                    disabled={isSavingProfile || isGoogleAccount}
                                    {...register("email", {
                                        required: "Введіть email",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Некоректний формат email",
                                        },
                                    })}
                                />
                            ) : (
                                <p className={styles.valueBox}>{user.email}</p>
                            )}
                            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                            {isEditing && isGoogleAccount && (
                                <p className={styles.hint}>Email привʼязаний до Google-акаунту і недоступний для зміни</p>
                            )}
                        </div>

                        {profileError && <p className={styles.error}>{profileError}</p>}

                        <div className={styles.formActions}>
                            {isEditing ? (
                                <>
                                    <Button
                                        variant="white"
                                        fontSize="1rem"
                                        text="Скасувати"
                                        type="button"
                                        disabled={isSavingProfile}
                                        onClick={handleCancelEditing}
                                    />
                                    <Button
                                        variant="grey"
                                        fontSize="1rem"
                                        text={isSavingProfile ? "Збереження..." : "Зберегти"}
                                        type="submit"
                                        isLoading={isSavingProfile}
                                    />
                                </>
                            ) : (
                                <Button
                                    variant="white"
                                    fontSize="1rem"
                                    text="Редагувати"
                                    type="button"
                                    onClick={handleStartEditing}
                                />
                            )}
                        </div>
                    </form>
                </div>

                <Button
                    variant="grey"
                    fontSize="var(--fs-profile-btn)"
                    text={isLoggingOut ? "Вихід..." : "Вийти"}
                    isLoading={isLoggingOut}
                    onClick={handleLogout}
                />
            </div>
        </div>
    );
}
