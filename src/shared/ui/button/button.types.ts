export interface ButtonProps{
    variant: "grey" | "white" | "yellow";
    text: string;
    fontSize: string;
    type?: "button" | "submit";
    disabled?: boolean;
    onClick?: () => void;
}