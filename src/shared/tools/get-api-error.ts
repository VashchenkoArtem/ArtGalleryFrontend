import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { SerializedError } from "@reduxjs/toolkit";

export function getApiErrorMessage(
    error: FetchBaseQueryError | SerializedError | undefined,
    fallback = "Щось пішло не так. Спробуйте ще раз"
): string {
    if (!error) return fallback;

    if ("status" in error) {
        const data = error.data;
        if (data && typeof data === "object" && "message" in data && typeof data.message === "string") {
            return data.message;
        }
        if (error.status === "FETCH_ERROR") {
            return "Немає з'єднання з сервером. Перевірте інтернет";
        }
        return fallback;
    }

    return error.message ?? fallback;
}