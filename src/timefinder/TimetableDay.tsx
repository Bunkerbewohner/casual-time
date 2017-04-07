import * as React from "react"
import {Claim, Plan} from "../model/Plan";
import {DateString, formatDate, now, twoDigits, groupByDay, getDateAndHour, getDateYmd, getHour} from "../model/DateTime";

import "../styles/TimetableDay.css"
import {range} from "../misc/collections";
import {User} from "../model/User";

interface TimetableDayProps {
    date: DateString;
    plan: Plan;
}

interface HourSlotProps {
    date: DateString;
    hour: number;
    plan: Plan;
}

interface HourSlotColumnProps {
    user: User;
    claim?: Claim;
}

class HourSlotColumn extends React.Component<HourSlotColumnProps, any> {
    render() {
        return <span>
            <input type="checkbox"/>
        </span>
    }
}

class HourSlot extends React.Component<HourSlotProps, any> {
    render() {
        const {date, hour, plan} = this.props
        const className = "HourSlot h" + hour
        const columns = plan.users.map(user => {
            const claims = plan.claims.filter(c => getDateYmd(c.time) === date && hour === getHour(c.time) && c.userEmail === user.email)
            return {user, claim: claims.length > 0 ? claims[0] : undefined}
        })

        return <div className={className}>
            <header>{twoDigits(this.props.hour)}:00</header>
            <main>
                {columns.map(col => <HourSlotColumn {...col}/>)}
            </main>
        </div>
    }
}

export default class TimetableDay extends React.Component<TimetableDayProps, any> {
    render() {
        const date = this.props.date
        const plan = this.props.plan
        const isToday = (date === formatDate(now()))
        const hours = isToday ? range(now().getHours(), 24) : range(0, 24)
        const className = isToday ? 'today' : ''

        return <div className="TimetableDay">
            <header>{this.props.date}</header>
            <main className={className}>
                {hours.map(hour => <HourSlot key={hour} date={date} hour={hour} plan={plan}/>)}
            </main>
        </div>
    }
}