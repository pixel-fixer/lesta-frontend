import { IVehicleDTO } from '../entities/Vehicle'
import { useMemo, useState } from 'react'
import { IVehicleTypeDTO } from '../entities/VehicleType'
import { INationDTO } from '../entities/Nation'
import { ISelectOption, TValue } from '../components/Select'

interface IUseFiltersParams {
    items: IVehicleDTO[]
    vehicleTypes: IVehicleTypeDTO[]
    nations: INationDTO[]
}

interface IFilter {
    options: ISelectOption[]
    value: TValue
    set: (value: TValue) => void
}

interface IUseFiltersResults {
    items: IVehicleDTO[]
    filters: IFilter[]
    reset: () => void
}

function useFilter({
    items,
    vehicleTypes,
    nations,
}: IUseFiltersParams): IUseFiltersResults {
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

    const filteredItems = items.filter((_) => {
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

    const handleResetFilters = () => {
        setLevel(null)
        setNation(null)
        setVehicleType(null)
    }

    const filters: IFilter[] = [
        {
            set: (value) => setNation(value),
            value: nation,
            options: nationOptions,
        },
        {
            set: (value) => setVehicleType(value),
            value: vehicleType,
            options: vehicleTypeOptions,
        },
        {
            set: (value) => setLevel(value),
            value: level,
            options: levelOptions,
        },
    ]

    return {
        items: filteredItems,
        filters,
        reset: handleResetFilters,
    }
}

export default useFilter
