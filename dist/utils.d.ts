import { IValues } from '@undermuz/use-form/build/types';
import { IUseFormSettings } from '@undermuz/use-form/build/types/useForm';
import { I as ISchemeItem, T as TypeValueItem, d as TypeValue } from './types-f66b7c24.js';
import '@undermuz/use-form/build/types/useForm/reducer';
import 'react';

declare const getDefValueForItem: (item: ISchemeItem) => any;
declare const getDefValueForScheme: (scheme: ISchemeItem[]) => TypeValueItem;
declare const useDefSchemeValue: (scheme: ISchemeItem[]) => TypeValueItem;
declare const useSafeValue: (unsafeValue: TypeValue, defValue: TypeValueItem, multiple?: boolean) => TypeValue;
declare const useSchemeToForm: (scheme: ISchemeItem[], value: TypeValueItem, onChange: (v: IValues) => void) => IUseFormSettings;

export { getDefValueForItem, getDefValueForScheme, useDefSchemeValue, useSafeValue, useSchemeToForm };
