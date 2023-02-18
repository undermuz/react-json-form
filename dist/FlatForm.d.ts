import React__default from 'react';
import { I as ISchemeItem, T as TypeValueItem } from './types-9dff5d46.js';
import { IValues } from '@undermuz/use-form';

interface IFlatForm {
    primary?: boolean;
    scheme: ISchemeItem[];
    value: TypeValueItem;
    onChange: (v: IValues) => void;
}
declare const FlatForm: React__default.FC<IFlatForm>;

export { FlatForm as default };
