import { IValues } from "@undermuz/use-form/build/types";
import { IUseFormSettings } from "@undermuz/use-form/build/types/useForm";
import { ISchemeItem, TypeValue, TypeValueItem } from "./types";
export declare const getDefValueForItem: (item: ISchemeItem) => any;
export declare const getDefValueForScheme: (scheme: ISchemeItem[]) => TypeValueItem;
export declare const useDefSchemeValue: (scheme: ISchemeItem[]) => TypeValueItem;
export declare const useSafeValue: (unsafeValue: TypeValue, defValue: TypeValueItem, multiple?: boolean) => TypeValue;
export declare const useSchemeToForm: (scheme: ISchemeItem[], value: TypeValueItem, onChange: (v: IValues) => void) => IUseFormSettings;
