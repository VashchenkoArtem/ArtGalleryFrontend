import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../../../app/store";
import { Button } from "../../../../shared/ui/button/button";
import { setAccessToken } from "../../../auth/model/authSlice";
import { useLogoutMutation } from "../../../auth/api/auth.api";
import { useMeQuery } from "../../api/profile.api";
import { CLOUDINARY_URL } from "../../../../shared/constants/server";
import styles from "./profile-page.module.css";

export function ProfilePage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { data: user, isLoading } = useMeQuery();
    const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

    const handleLogout = async () => {
        await logout();
        dispatch(setAccessToken(null));
        navigate("/login");
    };

    if (isLoading || !user) {
        return null;
    }

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                {user.avatar && (
                    <img
                        className={styles.avatar}
                        src={`${CLOUDINARY_URL}/${user.avatar}`}
                        alt=""
                    />
                )}
                <h1 className={styles.name}>{user.name}</h1>
                <p className={styles.email}>{user.email}</p>

                <Button
                    variant="white"
                    fontSize="var(--fs-profile-btn)"
                    text={isLoggingOut ? "Вихід..." : "Вийти"}
                    disabled={isLoggingOut}
                    onClick={handleLogout}
                />
            </div>
        </div>
    );
}
