import { useForm } from "react-hook-form"
import { Button } from "../../../../shared/ui/button/button"
import { useGetCollectionsQuery } from "../../../collections/api/collections.api"
import styles from "./create-picture-modal.module.css"
import type { CreatePictureFormData, CreatePictureModalProps } from "./create-picture-modal.types"
import { useCreatePictureMutation } from "../../api/pictures.api"

export function CreatePictureModal(props: CreatePictureModalProps) {
    const { data: collections } = useGetCollectionsQuery()
    const [ createPicture ] = useCreatePictureMutation()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreatePictureFormData>();
    const { isOpen, closeModal } = props
    const onSubmit = async (data: CreatePictureFormData) => {
        try{
            await createPicture(data)
            await closeModal()
        }catch (error){
            console.log(error)
        }
    }
    if (!isOpen) return null
    return (    
        <div className={styles.overlay}>
            <form className={styles.modal} onSubmit={handleSubmit(onSubmit)}>
                <h2 className={styles.title}>Створити нову картину</h2>

                <div className={styles.form} >
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="picture-title">
                            Назва картини:
                        </label>
                        <div className={styles.inputBox}>
                            <input
                                id="picture-title"
                                type="text"
                                className={styles.textInput}
                                placeholder="Введіть назву"
                                {...register("title", {
                                    required: true,
                                    maxLength: 35
                                })}
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="picture-file">
                            Файл картини:
                        </label>
                        <label className={`${styles.inputBox} ${styles.cursor}`} htmlFor="picture-file">
                            <span className={styles.placeholderLight}>Вибрати файл...</span>
                            <input
                                id="picture-file"
                                type="file"
                                accept="image/*"
                                className={styles.fileInput}
                                {...register("image", {
                                    required: true
                                })}
                            />
                        </label>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="picture-collection">
                            Коллекція:
                        </label>
                        <div className={`${styles.inputBox} ${styles.selectBox}`}>
                            <select id="picture-collection" className={styles.select} defaultValue="" {...register("collectionId", { required: true })}>
                                <option value="" disabled hidden>
                                    Вибрати коллекцію...
                                </option>
                                { collections?.map((collection) => <option key = {collection.id} className={styles.option} value={collection.id}>{collection.title}</option>)}
                            </select>
                            <span className={styles.selectArrow} />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <span className={styles.label}>Орієнтація:</span>

                        <div className={styles.radioGroup}>
                            <label className={styles.radioOption}>
                                <input
                                    type="radio"
                                    
                                    value="vertical"
                                    className={styles.radioInput}
                                    defaultChecked
                                    {...register("orientation", 
                                        {
                                            required: true
                                        }
                                    )}
                                />
                                <span className={`${styles.orientationIcon} ${styles.orientationIconVertical}`} />
                                Вертикальна
                            </label>

                            <label className={styles.radioOption}>
                                <input
                                    type="radio"
                                    name="orientation"
                                    value="horizontal"
                                    className={styles.radioInput}
                                />
                                <span className={`${styles.orientationIcon} ${styles.orientationIconHorizontal}`} />
                                Горизонтальна
                            </label>
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Button
                        variant="yellow"
                        text="Зберегти"
                        fontSize="1.5rem"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    )
}