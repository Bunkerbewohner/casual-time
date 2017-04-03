import * as React from "react"
import {User} from "../model/User";

import '../styles/Avatar.css'

interface AvatarProps {
    user: User;
}

export default class Avatar extends React.Component<AvatarProps, any> {
    render() {
        return <span className="Avatar"/>
    }
}