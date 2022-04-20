import React, { useMemo, useState } from 'react'
import useShips from '../hooks/useShips'
import Select, { ISelectOption, TValue } from './Select'
import Vehicle from './Vehicle'
import Spinner from './Spinner'
import styles from './Ships.module.css'

const Ships = (): JSX.Element => {
    const { vehicles, vehicleTypes, nations, isLoading } = useShips()
    const vehicleTypeOptions: ISelectOption[] = useMemo(
        () => [
            {
                icon: 'https://catoolwebdav-net-cdn.gcdn.co/catool/c7d0896b6d071e9b63ec7508556622af.png',
                value: null,
                label: 'Все типы',
            },
            ...(vehicleTypes.map((_) => ({
                icon: _.icons.default,
                value: _.name,
                label: _.title,
            })) ?? []),
        ],
        [vehicleTypes]
    )
    const nationOptions: ISelectOption[] = useMemo(
        () => [
            {
                icon: 'https://catoolwebdav-net-cdn.gcdn.co/catool/ef268eacb67bfc4c0c0f7383eced4b7c.png',
                value: null,
                label: 'Все нации',
            },
            ...(nations.map((_) => ({
                icon: _.icons.small ?? undefined,
                value: _.name,
                label: _.title,
            })) ?? []),
        ],
        [nations]
    )
    const levelOptions: ISelectOption[] = [
        { label: 'I-X Все уровни', value: null },
        { label: 'Уровень I', value: 1 },
        { label: 'Уровень II', value: 2 },
        { label: 'Уровень III', value: 3 },
        { label: 'Уровень IV', value: 4 },
        { label: 'Уровень V', value: 5 },
        { label: 'Уровень VI', value: 6 },
        { label: 'Уровень VII', value: 7 },
        { label: 'Уровень VIII', value: 8 },
        { label: 'Уровень IX', value: 9 },
        { label: 'Уровень X', value: 10 },
    ]
    const [level, setLevel] = useState<TValue>(null)
    const [vehicleType, setVehicleType] = useState<TValue>(null)
    const [nation, setNation] = useState<TValue>(null)

    const filteredItems = vehicles.filter((_) => {
        if (nation && _.nation.name !== nation) {
            return false
        }
        if (level && _.level !== level) {
            return false
        }

        if (vehicleType && _.type.name !== vehicleType) {
            return false
        }

        return true
    })

    // const { items, prevPage, nextPage } = usePaginator<IVehicleDTO>({
    //     items: filteredItems,
    // })

    console.log('SHIPS RENDER')

    const handleResetFilters = () => {
        setLevel(null)
        setNation(null)
        setVehicleType(null)
    }

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
                            <Select
                                options={nationOptions}
                                value={nation}
                                onChange={(value) => setNation(value)}
                            />
                            <Select
                                options={vehicleTypeOptions}
                                value={vehicleType}
                                onChange={(value) => setVehicleType(value)}
                            />
                            <Select
                                options={levelOptions}
                                value={level}
                                onChange={(value) => setLevel(value)}
                            />
                        </div>
                        <button
                            className={styles.filterButton}
                            onClick={handleResetFilters}
                        >
                            Показать всё
                        </button>
                    </div>
                    <div className={styles.vehicles}>
                        {filteredItems.map((vehicle) => (
                            <Vehicle key={vehicle.title} vehicle={vehicle} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Ships
