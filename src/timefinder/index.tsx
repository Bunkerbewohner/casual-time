import * as React from 'react'
import {RouteComponentProps} from "react-router";
import Timetable from "./Timetable";
import {Plan} from "../model/Plan";
import {addDays, formatDateTime, addHours, now} from "../model/DateTime";
import {User} from "../model/User";

const plan: Plan = {
    users: [
        {email: "mathias.kahl@gmail.com", name: "Atze", authTokens: [{token: "A"}]},
        {email: "machisuji@gmail.com", name: "Markus", authTokens: [{token: "B"}]},
        {email: "yikino@gmail.com", name: "Tobi", authTokens: [{token: "C"}]},
        {email: "clemens.kanzler@gmail.com", name: "Clemens", authTokens: [{token: "D"}]}
    ],
    claims: [
        { time: formatDateTime(addHours(now(), 1)), userEmail: "mathias.kahl@gmail.com", comment: "Deal with it" }
    ]
}

const user: User = {
    email: "mathias.kahl@gmail.com",
    name: "Mathias",
    authTokens: [
        { token: "A" }
    ]
}

const Timefinder = (props: RouteComponentProps<any>) =>
    <div>
        <header title={props.match.params.id}>
        </header>

        <main>
            <Timetable plan={plan} user={user}/>
        </main>
    </div>

export default Timefinder
