import { Button } from "../../../../shared/ui/button/button";
import { Collections } from "../../../collections/ui/collections/collections";
import { Pictures } from "../pictures/pictures";
import styles from "./main-page.module.css"

export function MainPage(){
    return (
        <div className={styles.mainPage}>
            <div className={styles.greetingBlock}>
                <h1 className={styles.greeting}>Ласкаво просимо до персональної галереї<br />
                    Володимира Тараненка!<br/>
                    <span className={styles.quote}>"Сучасний живопис, що надихає"</span>
                </h1>
            </div>
            <Button text="Подивитися картини" variant="grey" fontSize="1.5rem"/>
            <Pictures limit={10} />
            <Collections/>
        </div>
    )
}