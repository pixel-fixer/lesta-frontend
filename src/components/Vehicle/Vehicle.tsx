import React from 'react'
import { IVehicleDTO } from '../../entities/Vehicle'
import styles from './Vehicle.module.css'

interface IVehicle {
    vehicle: IVehicleDTO
}

const levelLabels: { [key: number]: string } = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
    9: 'IX',
    10: 'X',
}

const Vehicle = ({ vehicle }: IVehicle): JSX.Element => {
    const { icons, title, type, nation, level } = vehicle

    return (
        <div
            className={styles.container}
            style={{
                backgroundImage: `url(${nation.icons.large})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
            }}
        >
            {icons.medium && (
                <img src={icons.medium} className={styles.image} alt="" />
            )}
            <div className={styles.bottom}>
                <span className={styles.info}>
                    <img src={type.icons.default} alt="" />
                    &nbsp;
                    {type.title}&nbsp;{levelLabels[level]}
                </span>
                <div className={styles.name}>{title}</div>
            </div>
        </div>
    )
}

export default Vehicle
