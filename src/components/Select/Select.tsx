import React, { FC, PropsWithChildren, useRef, useState } from 'react'
import cn from 'classnames'
import useClickAway from 'react-use/lib/useClickAway'
import styles from './Select.module.css'

export type TValue = string | number | null

export interface ISelectOption {
    icon?: string
    label: string
    value: TValue
}

interface ISelect {
    options: ISelectOption[]
    value: TValue
    onChange: (value: TValue) => void
}

const Select: FC<PropsWithChildren<ISelect>> = ({
    options,
    value,
    onChange,
}): JSX.Element => {
    const optionsRef = useRef<HTMLDivElement>(null)
    const [isShowing, setIsShowing] = useState(false)

    useClickAway(optionsRef, () => {
        setIsShowing(false)
    })

    const valueOption = options.find((_) => _.value === value) ?? options[0]

    const handleChange = (value: TValue) => {
        onChange(value)
        setIsShowing(false)
    }

    return (
        <div className={styles.container}>
            <div
                className={cn(styles.option, styles.selected)}
                onClick={() => {
                    setIsShowing(true)
                }}
            >
                {valueOption?.icon && (
                    <span className={styles.optionIcon}>
                        <img
                            src={valueOption.icon}
                            alt=""
                            className={styles.optionIconImg}
                        />
                    </span>
                )}
                {valueOption?.label}
            </div>
            {isShowing && (
                <div className={styles.options} ref={optionsRef}>
                    {options.map(({ value, label, icon }) => (
                        <div
                            key={value}
                            className={styles.option}
                            onClick={() => {
                                handleChange(value)
                            }}
                        >
                            {icon && (
                                <span className={styles.optionIcon}>
                                    <img
                                        src={icon}
                                        alt=""
                                        className={styles.optionIconImg}
                                    />
                                </span>
                            )}
                            {label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Select
