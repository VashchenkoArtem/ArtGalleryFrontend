export interface InputProps {
    variant: "light" | "dark";
    placeholderText: string;
    label: string;
    // validationSchema: yup.AnySchema;
    // error: string;
    inputType: "text" | "password" | "email" | "radio";
}