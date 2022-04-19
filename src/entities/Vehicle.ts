import { IVehicleTypeDTO } from './VehicleType'
import { INationDTO } from './Nation'

export interface IVehicle extends IVehicleDTO {}

export interface IVehicleDTO {
    title: string
    description: string
    icons: {
        large: string
        medium: string
    }
    type: IVehicleTypeDTO
    level: number
    nation: INationDTO
}
