import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/ui/button/button";
import { Collections } from "../../../collections/ui/collections/collections";
import { Pictures } from "../pictures-with-scroll/pictures-with-scroll";
import styles from "./main-page.module.css"

export function MainPage(){
    const navigate = useNavigate();
    return (
        <div className={styles.mainPage}>
            <div className={styles.greetingBlock}>
                <h1 className={styles.greeting}>Ласкаво просимо до персональної галереї <br className={styles.desktopBreak} />
                     Володимира Тараненка! <br className={styles.desktopBreak} />
                    <span className={styles.quote}>"Сучасний живопис, що надихає"</span>
                </h1>
            </div>
            <Button text="Подивитися картини" variant="grey" fontSize="1.5rem" onClick={() => navigate("/pictures")}/>
            <Pictures limit={10}/>
            <Collections/>
        </div>
    )
}