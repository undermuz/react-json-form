import { FC } from "react";
export interface IGeoSelectValue {
    address: string;
    lat: number;
    lng: number;
}
interface IGeoSelect {
    name: string;
    value: IGeoSelectValue;
    onChange: Function;
    onTest: Function;
}
declare const GeoSelect: FC<IGeoSelect>;
export default GeoSelect;
