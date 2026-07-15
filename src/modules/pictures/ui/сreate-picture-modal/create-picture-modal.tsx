import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { SerializedError } from "@reduxjs/toolkit";
import { Button } from "../../../../shared/ui/button/button"
import { useGetCollectionsQuery } from "../../../collections/api/collections.api"
import { getApiErrorMessage } from "../../../../shared/tools/get-api-error"
import styles from "./create-picture-modal.module.css"
import type { CreatePictureFormData, CreatePictureModalProps } from "./create-picture-modal.types"
import { useCreatePictureMutation } from "../../api/pictures.api"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5МБ — такий самий ліміт, як на бекенді (upload-middleware.ts)

// Скільки тримати кнопку в стані "Збережено!", перш ніж закрити модалку —
// щоб користувач встиг побачити, що все пройшло успішно.
const SUCCESS_DISPLAY_MS = 900

export function CreatePictureModal(props: CreatePictureModalProps) {
    const { isOpen, closeModal } = props

    const { data: collections } = useGetCollectionsQuery()
    const [createPicture, { isLoading }] = useCreatePictureMutation()

    const [serverError, setServerError] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<CreatePictureFormData>({
        mode: "onBlur",
    });

    const selectedFile = watch("image")?.[0]

    // Прев'ю обраного зображення + очищення object URL, щоб не текла пам'ять
    useEffect(() => {
        if (!selectedFile) {
            setImagePreview(null)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setImagePreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    // Якщо модалку закрили ззовні (пропс isOpen стає false) — скидаємо форму
    // і всі внутрішні стани, щоб наступне відкриття було "чистим"
    useEffect(() => {
        if (!isOpen) {
            reset()
            setServerError(null)
            setIsSuccess(false)
        }
    }, [isOpen, reset])

    useEffect(() => {
        return () => {
            if (successTimeoutRef.current) {
                clearTimeout(successTimeoutRef.current)
            }
        }
    }, [])

    const handleClose = () => {
        if (isLoading) return // не даємо закрити модалку поки запит виконується
        closeModal()
    }

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            handleClose()
        }
    }

    const onSubmit = async (data: CreatePictureFormData) => {
        setServerError(null)
        try {
            await createPicture(data).unwrap()
            setIsSuccess(true)
            successTimeoutRef.current = setTimeout(() => {
                closeModal()
            }, SUCCESS_DISPLAY_MS)
        } catch (error) {
            setServerError(getApiErrorMessage(error as FetchBaseQueryError | SerializedError))
        }
    }

    if (!isOpen) return null

    const buttonText = isSuccess ? "Збережено!" : isLoading ? "Збереження..." : "Зберегти"

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <form className={styles.modal} onSubmit={handleSubmit(onSubmit)} noValidate>
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={handleClose}
                    disabled={isLoading}
                    aria-label="Закрити"
                >
                    &times;
                </button>

                <h2 className={styles.title}>Створити нову картину</h2>

                <div className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="picture-title">
                            Назва картини:
                        </label>
                        <div className={`${styles.inputBox} ${errors.title ? styles.inputBoxInvalid : ""}`}>
                            <input
                                id="picture-title"
                                type="text"
                                className={styles.textInput}
                                placeholder="Введіть назву"
                                disabled={isLoading}
                                {...register("title", {
                                    required: "Введіть назву картини",
                                    minLength: {
                                        value: 2,
                                        message: "Назва занадто коротка",
                                    },
                                    maxLength: {
                                        value: 35,
                                        message: "Назва повинна містити менше 35 символів",
                                    },
                                })}
                            />
                        </div>
                        {errors.title && (
                            <p className={styles.errorMessage}>{errors.title.message}</p>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="picture-file">
                            Файл картини:
                        </label>
                        <label
                            className={`${styles.inputBox} ${styles.cursor} ${errors.image ? styles.inputBoxInvalid : ""}`}
                            htmlFor="picture-file"
                        >
                            {imagePreview && (
                                <img className={styles.filePreview} src={imagePreview} alt="" />
                            )}
                            <span className={styles.placeholderLight}>
                                {selectedFile ? selectedFile.name : "Вибрати файл..."}
                            </span>
                            <input
                                id="picture-file"
                                type="file"
                                accept="image/*"
                                className={styles.fileInput}
                                disabled={isLoading}
                                {...register("image", {
                                    required: "Оберіть файл картини",
                                    validate: {
                                        isImage: (files) =>
                                            !files?.[0] ||
                                            files[0].type.startsWith("image/") ||
                                            "Дозволені лише файли зображень",
                                        maxSize: (files) =>
                                            !files?.[0] ||
                                            files[0].size <= MAX_FILE_SIZE ||
                                            "Розмір файлу не повинен перевищувати 5МБ",
                                    },
                                })}
                            />
                        </label>
                        {errors.image && (
                            <p className={styles.errorMessage}>{errors.image.message}</p>
                        )}
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="picture-collection">
                            Коллекція:
                        </label>
                        <div className={`${styles.inputBox} ${styles.selectBox} ${errors.collectionId ? styles.inputBoxInvalid : ""}`}>
                            <select
                                id="picture-collection"
                                className={styles.select}
                                defaultValue=""
                                disabled={isLoading}
                                {...register("collectionId", {
                                    required: "Оберіть колекцію",
                                    valueAsNumber: true,
                                })}
                            >
                                <option value="" disabled hidden>
                                    Вибрати коллекцію...
                                </option>
                                {collections?.map((collection) => (
                                    <option key={collection.id} className={styles.option} value={collection.id}>
                                        {collection.title}
                                    </option>
                                ))}
                            </select>
                            <span className={styles.selectArrow} />
                        </div>
                        {errors.collectionId && (
                            <p className={styles.errorMessage}>{errors.collectionId.message}</p>
                        )}
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
                                    disabled={isLoading}
                                    {...register("orientation", { required: "Оберіть орієнтацію" })}
                                />
                                <span className={`${styles.orientationIcon} ${styles.orientationIconVertical}`} />
                                Вертикальна
                            </label>

                            <label className={styles.radioOption}>
                                <input
                                    type="radio"
                                    value="horizontal"
                                    className={styles.radioInput}
                                    disabled={isLoading}
                                    {...register("orientation", { required: "Оберіть орієнтацію" })}
                                />
                                <span className={`${styles.orientationIcon} ${styles.orientationIconHorizontal}`} />
                                Горизонтальна
                            </label>
                        </div>
                        {errors.orientation && (
                            <p className={styles.errorMessage}>{errors.orientation.message}</p>
                        )}
                    </div>
                </div>

                {serverError && (
                    <p className={`${styles.errorMessage} ${styles.serverError}`}>{serverError}</p>
                )}

                <div className={styles.actions}>
                    <Button
                        variant="yellow"
                        text={buttonText}
                        fontSize="1.5rem"
                        type="submit"
                        isLoading={isLoading}
                        disabled={isSuccess}
                    />
                </div>
            </form>
        </div>
    )
}