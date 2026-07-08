export interface UserWithoutPassword {
    id: number;
    name: string;
    email: string;
    googleId: string | null;
    avatar: string | null;
    isAdmin: boolean;
}