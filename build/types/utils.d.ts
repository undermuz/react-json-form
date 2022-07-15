import { ISchemeItem, TypeValue, TypeValueItem } from "./types";
export declare const getDefValueForScheme: (scheme: ISchemeItem[]) => TypeValueItem;
export declare const useDefSchemeValue: (scheme: ISchemeItem[]) => TypeValueItem;
export declare const useSafeValue: (unsafeValue: TypeValue, defValue: TypeValueItem, multiple?: boolean) => TypeValue;
