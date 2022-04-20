import React from 'react'
import useShips from '../../hooks/useShips'
import Select from '../Select'
import Vehicle from '../Vehicle'
import Spinner from '../Spinner'
import useFilter from '../../hooks/useFilter'
import styles from './Ships.module.css'

const Ships = (): JSX.Element => {
    const { vehicles, vehicleTypes, nations, isLoading } = useShips()
    const { items, filters, reset } = useFilter({
        items: vehicles,
        vehicleTypes,
        nations,
    })

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img
                    src="https://catoolwebdav-net-cdn.gcdn.co/catool/80f9459621190bde476783962f5476fa.png"
                    alt=""
                />
            </div>
            {isLoading && <Spinner />}
            {!isLoading && (
                <>
                    <div className={styles.filterPanel}>
                        <div>
                            {filters.map(({ options, value, set }) => (
                                <Select
                                    options={options}
                                    value={value}
                                    onChange={(value) => set(value)}
                                />
                            ))}
                        </div>
                        <button className={styles.filterButton} onClick={reset}>
                            Показать всё
                        </button>
                    </div>
                    <div className={styles.vehicles}>
                        {items.map((vehicle) => (
                            <Vehicle key={vehicle.title} vehicle={vehicle} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Ships
