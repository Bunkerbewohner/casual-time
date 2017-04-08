import * as React from "react"
import "../styles/Toggle.css"

interface ToggleProps {
    value: boolean;
    tooltip?: string;
    comment?: string;
    save?: (value: boolean, comment?: string) => void;
}

interface ToggleState {
    value: boolean;
    editing: boolean;
    content?: string;
    tooltip?: string;
}

export default class Toggle extends React.Component<ToggleProps, ToggleState> {
    constructor(props: ToggleProps) {
        super()

        this.state = {
            value: props.value,
            content: props.comment,
            editing: false
        }
    }

    render() {
        const className = "Toggle" + (this.state.value ? ' true' : ' false')

        return <span className={className} onClick={this.onClick} onMouseOver={this.onMouseOver}
                     onMouseOut={this.onMouseOut}>
            {this.tooltip()}
            {this.content()}
        </span>
    }

    tooltip() {
        if (this.state.tooltip && !this.state.editing) {
            return <span className="tooltip"><span>{this.state.tooltip}</span></span>
        } else if (this.state.value && this.props.tooltip) {
            return <span className="tooltip"><span>{this.props.tooltip}</span></span>
        } else {
            return null
        }
    }

    content() {
        if (this.state.editing) {
            return <input autoCorrect="false" ref="text" type="text" onKeyDown={this.onKeyDown} onBlur={e => this.cancelEditing()}/>
        } else if (this.state.content) {
            return <input autoCorrect="false" readOnly className="content" defaultValue={this.state.content}/>
        } else {
            return <span/>
        }
    }

    cancelEditing() {
        const input = this.refs["text"] as HTMLInputElement
        input.blur()

        const value = this.state.value
        const comment = input.value
        this.setState({value: value, editing: false, content: comment})

        if (this.props.save) {
            this.props.save(value, comment)
        }
    }

    componentDidUpdate(prevProps: ToggleProps, prevState: ToggleState) {
        if (!prevState.editing && this.state.editing) {
            const input = this.refs["text"] as HTMLInputElement
            input.focus()
        }
    }

    onMouseOver = (e: React.MouseEvent<HTMLInputElement>) => {
        if (this.props.tooltip) {
            this.setState({tooltip: this.props.tooltip})
        }
    }

    onMouseOut = (e: React.MouseEvent<HTMLInputElement>) => {
        if (this.state.tooltip) {
            this.setState({
                tooltip: null
            })
        }
    }

    onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 27/*ESC*/ || e.keyCode === 13/*ENTER*/) {
            this.cancelEditing()
        }
    }

    onClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        const value = !this.state.value
        const comment = this.state.value ? null : this.state.content

        this.setState({
            value: value,
            editing: value,
            content: comment
        })

        if (this.props.save) {
            this.props.save(value, comment)
        }
    }
}