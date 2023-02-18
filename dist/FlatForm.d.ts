import React__default from 'react';
import { I as ISchemeItem, T as TypeValueItem } from './types-f66b7c24.js';
import { IValues } from '@undermuz/use-form';
import '@undermuz/use-form/build/types/useForm';
import '@undermuz/use-form/build/types/useForm/reducer';

interface IFlatForm {
    primary?: boolean;
    scheme: ISchemeItem[];
    value: TypeValueItem;
    onChange: (v: IValues) => void;
}
declare const FlatForm: React__default.FC<IFlatForm>;

export { FlatForm as default };
