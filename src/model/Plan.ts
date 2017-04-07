import User from "./User";
import {DateTimeString, DateString, getDateYmd} from "./DateTime";

export interface Claim {
    userEmail: string;
    time: DateTimeString;
    comment?: string;
}

export interface Plan {
    users: User[]
    password?: string;
    claims: Claim[];
}

export default Plan
