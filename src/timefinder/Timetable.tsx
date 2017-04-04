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
import classNames from "classnames"

interface TimetableProps {
    plan: Plan;
    user: User;
}

const TimetableRowHead = ({plan, day}: {plan: Plan, day: DateString}) => <div>
    <div className="day">{dateToHumanReadable(day)}</div>

    {getHours(day).map(hour => <div className="hour" key={hour}>{twoDigits(hour)}:00</div>)}
</div>

const TimetableRow = ({plan, user, day}: {plan: Plan, user: User, day: DateString}) => <div>
    <div className="day">&nbsp;</div>

    {getHours(day).map(hour => <div className="hour" key={hour}><Toggle value={false} tooltip={twoDigits(hour)+":00"}/></div>)}
</div>

const TimetableColumn = ({plan, user, activeUser}: {plan: Plan, user: User, activeUser: User}) => {
    const className = classNames("TimetableColumn", {active: activeUser.email === user.email})

    return <div className={className}>
        <div className="backdrop">&nbsp;</div>
        <header><Avatar user={user}/> {user.name}</header>
        <main>
            {range(0, 7).map(dayOffset => <TimetableRow key={dayOffset} plan={plan} user={user}
                                                        day={formatDate(addDays(now(), dayOffset))}/>)}
        </main>
    </div>
}

export default class Timetable extends React.Component<TimetableProps, any> {
    render() {
        const plan: Plan = this.props.plan

        return <div className="Timetable">
            <div className="RowHeaders">
                <header>HH:MM</header>
                <main>
                    {range(0, 7).map(dayOffset => <TimetableRowHead plan={plan} key={dayOffset}
                                                                    day={formatDate(addDays(now(), dayOffset))}/>)}
                </main>
            </div>
            {plan.users.map(u => <TimetableColumn key={u.email} plan={plan} user={u} activeUser={this.props.user}/>)}
        </div>
    }
}

