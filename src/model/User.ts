import AuthToken from "./AuthToken"
import {User as FirebaseUser} from "firebase/app"

export interface User {
    email: string;
    name: string;
    auth?: FirebaseUser;
}

export default User