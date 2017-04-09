import * as React from 'react'
import {RouteComponentProps} from "react-router";
import Timetable from "./Timetable";
import {Plan, Claim} from "../model/Plan";
import {User} from "../model/User";
import {getIn, updateIn, add, propsNotEqualX, setIn} from "../misc/fun";

const plan: Plan = {
    users: [
        {email: "mathias.kahl@gmail.com", name: "Atze", authTokens: [{token: "A"}]},
        {email: "machisuji@gmail.com", name: "Markus", authTokens: [{token: "B"}]},
        {email: "yikino@gmail.com", name: "Tobi", authTokens: [{token: "C"}]},
        {email: "clemens.kanzler@gmail.com", name: "Clemens", authTokens: [{token: "D"}]}
    ],
    claims: [],
    guidelines: [
        "18:00"
    ]
}

const user: User = {
    email: "mathias.kahl@gmail.com",
    name: "Mathias",
    authTokens: [
        {token: "A"}
    ]
}

function addClaim(claim: Claim) {
    return (plan: Plan) => {
        const existingClaims = plan.claims
        const withoutConflicts = existingClaims.filter(c => c.userEmail !== claim.userEmail || c.time !== claim.time)
        const updated = add(withoutConflicts, claim)
        return setIn(plan, ["claims"], updated)
    }
}

function removeClaim(claim: Claim) {
    return (plan: Plan) => {
        const existingClaims = plan.claims
        const updated = existingClaims.filter(c => c.userEmail !== claim.userEmail || c.time !== claim.time)
        return setIn(plan, ["claims"], updated)
    }
}

interface TimefinderState {
    plan: Plan;
}

class Timefinder extends React.Component<RouteComponentProps<any>, TimefinderState> {
    state = {
        plan: plan
    }

    render() {
        const props = this.props

        return <div>
            <header title={props.match.params.id}>
            </header>

            <main>
                <Timetable plan={this.state.plan} user={user} addClaim={this.addClaim} removeClaim={this.removeClaim}/>
            </main>
        </div>
    }

    addClaim = (claim: Claim) => {
        this.setState({plan: addClaim(claim)(this.state.plan)})
    }

    removeClaim = (claim: Claim) => {
        this.setState({plan: removeClaim(claim)(this.state.plan)})
    }
}

export default Timefinder
