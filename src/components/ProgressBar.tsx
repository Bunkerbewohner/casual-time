import * as React from "react"
import classNames from "classnames"
import "../styles/ProgressBar.css"

export interface ProgressBarProps {
    progress: number;
    progress2?: number;
    className?: string;
}

const ProgressBar = ({progress, progress2, className}: ProgressBarProps) => {
    const percent = Math.max(0, Math.min(1, progress)) * 100
    const percent2 = Math.max(0, Math.min(1, progress2)) * 100
    const klass = classNames("ProgressBar", className)

    return <div className={klass}>
        <div className="bar" style={{width: percent+"%"}}/>
        <div className="bar2" style={{width: percent2+"%"}}/>
    </div>
}

export default ProgressBar