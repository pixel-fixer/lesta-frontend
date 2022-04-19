import { useQuery } from 'react-query'
import request, { gql } from 'graphql-request'
import { IVehicleDTO } from '../entities/Vehicle'
import { IVehicleTypeDTO } from '../entities/VehicleType'
import { INationDTO } from '../entities/Nation'

interface IUseShipsResult {
    isLoading: boolean
    vehicles: IVehicleDTO[]
    vehicleTypes: IVehicleTypeDTO[]
    nations: INationDTO[]
}

const API_URL = 'https://vortex.worldofwarships.ru/api/graphql/glossary/'
const QUERY_KEY = 'SHIPS'

function useShips(): IUseShipsResult {
    const { data, isLoading } = useQuery([QUERY_KEY], async () => {
        const { vehicles, vehicleTypes, nations } = await request(
            API_URL,
            gql`
                {
                    vehicles {
                        title
                        description
                        icons {
                            large
                            medium
                        }
                        level
                        type {
                            name
                            title
                            icons {
                                default
                            }
                        }
                        nation {
                            name
                            title
                            color
                            icons {
                                small
                                medium
                                large
                            }
                        }
                    }
                    vehicleTypes {
                        name
                        title
                        icons {
                            default
                        }
                    }
                    nations {
                        name
                        title
                        icons {
                            small
                        }
                    }
                }
            `
        )

        return { vehicles, vehicleTypes, nations }
    })

    return {
        isLoading,
        vehicles: data?.vehicles ?? [],
        vehicleTypes: data?.vehicleTypes ?? [],
        nations: data?.nations ?? [],
    }
}

export default useShips
