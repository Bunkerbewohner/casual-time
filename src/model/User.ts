import AuthToken from "./AuthToken"

export interface User {
    email: string;
    name: string;
    authTokens: AuthToken[];
}

export default User