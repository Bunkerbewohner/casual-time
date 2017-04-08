import * as React from "react";
import Plan, {Claim} from "../model/Plan";
import {
    addDays, DateString, dateToHumanReadable, formatDate, getHours, groupByDay, now,
    twoDigits, getDateAndHour, getDateYmd, getHour, TimeString, getTimeString
} from "../model/DateTime";
import {range, any} from "../misc/collections";
import "../styles/Timetable.css"
import {User} from "../model/User";
import Avatar from "../components/Avatar";
import Toggle from "../components/Toggle";
import classNames from "classnames"
import {equalsX} from "../misc/fun";
import ProgressBar from "../components/ProgressBar";

interface TimetableProps {
    plan: Plan;
    user: User;
}

const TimetableRowHeadCell = ({plan, day, hour}: {plan: Plan, day: DateString, hour: number}) => {
    const timestring = twoDigits(hour) + ":00"
    const claims = plan.claims.filter(c => getDateYmd(c.time) === day && getTimeString(c.time) === timestring)
    const claimsCount = claims.length
    const claimsProgress = claimsCount / (plan.targetCount || plan.users.length)
    const className = classNames("TimetableRowHeadCell", "hour", {
        guideline: any(plan.guidelines, equalsX(timestring))
    })
    const progressClassName = classNames({hidden: claimsCount === 0})

    return <div className={className} key={hour}>
        <time>{timestring}</time>
        <label className={progressClassName}>{claimsCount}</label>
        <ProgressBar className={progressClassName} progress={claimsProgress}/>
    </div>
}

const TimetableRowHead = ({plan, day}: {plan: Plan, day: DateString}) => <div>
    <div className="day">{dateToHumanReadable(day)}</div>

    {getHours(day).map(hour => <TimetableRowHeadCell key={day+hour} plan={plan} day={day} hour={hour}/>)}
</div>

const TimetableCell = ({day, hour, user, plan}: {day: DateString, hour: number, user: User, plan: Plan}) => {
    const timestring = twoDigits(hour) + ":00"
    const claim = plan.claims.filter(c => getDateYmd(c.time) === day && getHour(c.time) === hour && c.userEmail === user.email)[0]
    const value = claim ? true : false
    const comment = claim ? claim.comment : null
    const className = classNames("hour", {
        guideline: any(plan.guidelines, equalsX(timestring))
    })

    return <div className={className}>
        <Toggle value={value} comment={comment} tooltip={timestring}/>
    </div>
}

const TimetableRow = ({plan, user, day}: {plan: Plan, user: User, day: DateString}) => <div>
    <div className="day">&nbsp;</div>

    {getHours(day).map(hour => <TimetableCell day={day} hour={hour} user={user} plan={plan} key={hour}/>)}
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

