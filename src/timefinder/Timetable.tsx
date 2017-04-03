import * as React from "react";
import Plan, {Claim} from "../model/Plan";
import {
    addDays, DateString, dateToHumanReadable, formatDate, getHours, groupByDay, now,
    twoDigits
} from "../model/DateTime";
import {range} from "../misc/collections";
import TimetableDay from "./TimetableDay";
import "../styles/Timetable.css"
import {User} from "../model/User";
import Avatar from "../components/Avatar";
import Toggle from "../components/Toggle";

interface TimetableProps {
    plan: Plan;
}

const TimetableRowHead = ({plan, day}: { plan: Plan, day: DateString}) => <div>
    <div className="day">{dateToHumanReadable(day)}</div>

    {getHours(day).map(hour => <div className="hour">{twoDigits(hour)}:00</div>)}
</div>

const TimetableRow = ({plan, user, day}: { plan: Plan, user: User, day: DateString }) => <div>
    <div className="day">&nbsp;</div>

    {getHours(day).map(hour => <div className="hour"><Toggle value={false}/></div>)}
</div>

const TimetableColumn = ({plan, user}: { plan: Plan, user: User }) => <div>
    <header><Avatar user={user}/> {user.name}</header>
    <main>
        {range(0, 7).map(dayOffset => <TimetableRow plan={plan} user={user} day={formatDate(addDays(now(), dayOffset))}/>)}
    </main>
</div>

export default class Timetable extends React.Component<TimetableProps, any> {
    render() {
        const plan: Plan = this.props.plan
        const days = range(0, 7).map(dayOffset => {
            return formatDate(addDays(now(), dayOffset))
        })

        return <div className="Timetable">
            <div>
                <header>HH:MM</header>
                <main>
                    {range(0, 7).map(dayOffset => <TimetableRowHead plan={plan} day={formatDate(addDays(now(), dayOffset))}/>)}
                </main>
            </div>
            {plan.users.map(u => <TimetableColumn key={u.email} plan={plan} user={u}/>)}
        </div>
    }
}

