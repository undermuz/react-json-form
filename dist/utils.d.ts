import { IValues, IUseFormSettings } from '@undermuz/use-form';
import { I as ISchemeItem, T as TypeValueItem, d as TypeValue } from './types-9dff5d46.js';
import 'react';

declare const getDefValueForItem: (item: ISchemeItem) => any;
declare const getDefValueForScheme: (scheme: ISchemeItem[]) => TypeValueItem;
declare const useDefSchemeValue: (scheme: ISchemeItem[]) => TypeValueItem;
declare const useSafeValue: (unsafeValue: TypeValue, defValue: TypeValueItem, multiple?: boolean) => TypeValue;
declare const useSchemeToForm: (scheme: ISchemeItem[], value: TypeValueItem, onChange: (v: IValues) => void) => IUseFormSettings;

export { getDefValueForItem, getDefValueForScheme, useDefSchemeValue, useSafeValue, useSchemeToForm };
