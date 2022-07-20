import { MouseEventHandler } from "react";
import { IScheme } from "../../../types";
export interface IPrice2ValuePricesItem {
    id: number;
    title: string;
}
export interface IPrice2ValuePrices {
    id: number;
    title: string;
    price: number;
    is_active: boolean;
    list: IPrice2ValuePricesItem[];
}
export interface IPrice2Value {
    title: string;
    subtitle: string;
    button_text: string;
    prices: IPrice2ValuePrices[];
}
export interface IPrice2 {
    id: number;
    value: IPrice2Value;
    onButtonClick?: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement>;
}
declare const scheme: IScheme;
export default scheme;
