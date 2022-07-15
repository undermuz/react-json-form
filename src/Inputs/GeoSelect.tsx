import React, { FC, FormEvent } from "react"

import { Button } from "grommet"

export interface IGeoSelectValue {
    address: string
    lat: number
    lng: number
}

interface IGeoSelect {
    name: string
    value: IGeoSelectValue
    onChange: Function
    onTest: Function
}

const GeoSelect: FC<IGeoSelect> = (props) => {
    const { value, onChange, onTest } = props

    const handleChangeAddress = (e: FormEvent<HTMLInputElement>) => {
        const { lat = 0, lng = 0 } = value

        onChange({
            address: e.currentTarget.value,
            lat,
            lng,
        })
    }

    const handleChangeLat = (e: FormEvent<HTMLInputElement>) => {
        const { address = "", lng = 0 } = value

        onChange({
            address,
            lat: e.currentTarget.value,
            lng,
        })
    }

    const handleChangeLng = (e: FormEvent<HTMLInputElement>) => {
        const { lat = 0, address = "" } = value

        onChange({
            address,
            lat,
            lng: e.currentTarget.value,
        })
    }

    const handleTestAddress = (e: FormEvent<HTMLInputElement>) => {
        const { lat = 0, lng = 0 } = props.value

        onTest({
            address: e.currentTarget.value,
            lat,
            lng,
        })
    }

    const handleTestLat = (e: FormEvent<HTMLInputElement>) => {
        const { address = "", lng = 0 } = value

        onTest({
            address,
            lat: e.currentTarget.value,
            lng,
        })
    }

    const handleTestLng = (e: FormEvent<HTMLInputElement>) => {
        const { lat = 0, address = "" } = value

        onTest({
            address,
            lat,
            lng: e.currentTarget.value,
        })
    }

    const handleSelectOnMap = () => {
        // const { address = "", lat = 0, lng = 0 } = props.value
        // window.common_widgets.GeoSelect({
        //     address,
        //     lat,
        //     lng,
        //     onSelect: (props) => {
        //         console.log("handleSelectOnMap: ", props)
        //         props.onChange(props)
        //     },
        // })
    }

    const { address = "", lat = 0, lng = 0 } = props.value

    return (
        <div className={"geo-select-inline"}>
            <input
                placeholder="Адрес"
                name="address"
                type="text"
                value={address}
                className="form-control"
                onChange={handleChangeAddress}
                onBlur={handleTestAddress}
            />

            <input
                name="lat"
                type="text"
                value={lat}
                className="form-control"
                onChange={handleChangeLat}
                onBlur={handleTestLat}
            />

            <input
                name="lng"
                type="text"
                value={lng}
                className="form-control"
                onChange={handleChangeLng}
                onBlur={handleTestLng}
            />

            <Button onClick={handleSelectOnMap}>Выбрать на карте</Button>
        </div>
    )
}

export default GeoSelect
