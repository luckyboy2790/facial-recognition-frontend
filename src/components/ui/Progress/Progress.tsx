import classNames from '@/utils/classNames'
import Line from './Line'
import Circle from './Circle'
import { SIZES, DIRECTIONS } from '../utils/constants'
import type { CommonProps } from '../@types/common'
import type { StrokeLinecap, GapPosition } from './Circle'
import type { ReactNode, Ref } from 'react'

export interface ProgressProps extends CommonProps {
    customInfo?: string | ReactNode
    customColorClass?: string
    gapDegree?: number
    gapPosition?: GapPosition
    percent?: number
    ref?: Ref<HTMLDivElement>
    showInfo?: boolean
    size?: 'sm' | 'md'
    strokeLinecap?: StrokeLinecap
    strokeWidth?: number
    trailClass?: string
    width?: string | number
    variant?: 'line' | 'circle'
}

const Progress = (props: ProgressProps) => {
    const {
        className,
        customInfo,
        customColorClass,
        gapDegree = 0,
        gapPosition = DIRECTIONS.TOP,
        percent = 0,
        ref,
        showInfo = true,
        size = SIZES.MD,
        strokeLinecap = 'round',
        strokeWidth = 6,
        width = 120,
        variant = 'line',
    } = props

    const renderProcessInfo = () => {
        if (!showInfo) {
            return null
        }
        return (
            <span className={`progress-info heading-text font-bold ${variant}`}>
                {customInfo || `${percent}%`}
            </span>
        )
    }

    const strokeColor = customColorClass
        ? customColorClass
        : variant === 'line'
          ? 'bg-primary'
          : 'text-primary'

    const progressClass = classNames(
        'progress',
        className,
        variant === 'circle' ? 'circle' : 'line',
    )

    const renderProgress = () => {
        const progressInfo = renderProcessInfo()
        let progress

        if (variant === 'line') {
            progress = (
                <Line
                    percent={percent}
                    size={size}
                    strokeColor={strokeColor}
                    {...props}
                >
                    {progressInfo}
                </Line>
            )
        }

        if (variant === 'circle') {
            progress = (
                <Circle
                    gapDegree={gapDegree}
                    gapPosition={gapPosition as GapPosition}
                    percent={percent}
                    strokeColor={strokeColor}
                    strokeLinecap={strokeLinecap}
                    strokeWidth={strokeWidth}
                    width={width}
                    {...props}
                >
                    {progressInfo}
                </Circle>
            )
        }

        return progress
    }

    return (
        <div ref={ref} className={progressClass}>
            {renderProgress()}
        </div>
    )
}

export default Progress
