import React from 'react'
import { IVehicleDTO } from '../entities/Vehicle'

interface IVehicle {
    vehicle: IVehicleDTO
}

const Vehicle = ({ vehicle }: IVehicle): JSX.Element => {
    const { icons, title, type } = vehicle

    return (
        <div style={{ border: '1px solid grey', padding: '20px' }}>
            <p>{icons.medium && <img src={icons.medium} alt="" />}</p>
            <p>{title}</p>
            <p>{type.title}</p>
        </div>
    )
}

export default Vehicle
