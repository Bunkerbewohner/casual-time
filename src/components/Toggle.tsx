import * as React from "react"
import "../styles/Toggle.css"

interface ToggleProps {
    value: boolean;
}

interface ToggleState {
    value: boolean;
}

export default class Toggle extends React.Component<ToggleProps, ToggleState> {
    constructor(props: ToggleProps) {
        super()

        this.state = {
            value: props.value
        }
    }

    render() {
        const className = "Toggle" + (this.state.value ? ' true' : ' false')

        return <span className={className} onClick={this.onClick}>
            &nbsp;
        </span>
    }

    onClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        this.setState({
            value: !this.state.value
        })
    }
}