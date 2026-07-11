export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface GoogleAuthPayload {
    idToken: string;
}

export interface AuthResponse {
    accessToken: string;
}
