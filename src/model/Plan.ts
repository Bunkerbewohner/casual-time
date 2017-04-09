import User from "./User";
import {DateTimeString, DateString, getDateYmd, TimeString} from "./DateTime";

export interface Claim {
    userEmail: string;
    time: DateTimeString;
    committed?: boolean;
    comment?: string;
}

/**
 * A plan for time scheduling
 */
export interface Plan {
    /**
     * List of users with access to the plan.
     */
    users: User[]

    /**
     * Optional password that is required to access the plan.
     */
    password?: string;

    /**
     * List of time claims by users.
     */
    claims: Claim[];

    /**
     *  Optional list of day times at which guidelines will be displayed.
     */
    guidelines?: TimeString[];

    /**
     * Target for number of claims within an hour slot
     */
    targetCount?: number;
}

export default Plan
