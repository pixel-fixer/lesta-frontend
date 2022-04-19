import React from 'react'
import useShips from '../hooks/useShips'
import Vehicle from './Vehicle'
import usePaginator from '../hooks/usePaginator'
import {IVehicleDTO} from "../entities/Vehicle";

const Ships = (): JSX.Element => {
    const { vehicles, vehicleTypes, nations, isLoading } = useShips()
    const { items, prevPage, nextPage } = usePaginator<IVehicleDTO>({
        items: vehicles,
    })

    console.log('SHIPS RENDER', vehicles, vehicleTypes, nations)

    if (isLoading) {
        return <>Загрузка...</>
    }

    return (
        <div>
            <button onClick={prevPage}>prev page</button>
            <button onClick={nextPage}>next page</button>
            {items.map((vehicle) => (
                <Vehicle key={vehicle.title} vehicle={vehicle} />
            ))}
        </div>
    )
}

export default Ships
