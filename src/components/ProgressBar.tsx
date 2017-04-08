import * as React from "react"
import classNames from "classnames"
import "../styles/ProgressBar.css"

export interface ProgressBarProps {
    progress: number;
    className?: string;
}

const ProgressBar = ({progress, className}: ProgressBarProps) => {
    const percent = Math.max(0, Math.min(1, progress)) * 100
    const klass = classNames("ProgressBar", className)

    return <div className={klass}>
        <div className="bar" style={{width: percent+"%"}}/>
    </div>
}

export default ProgressBar