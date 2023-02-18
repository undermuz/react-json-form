import React__default from 'react';
import { T as TypeValueItem, I as ISchemeItem } from './types-9dff5d46.js';
import '@undermuz/use-form';

interface IArrayForm {
    value: TypeValueItem[];
    primary?: boolean;
    defValue: TypeValueItem;
    scheme: ISchemeItem[];
    onChange: Function;
}
declare const ArrayForm: React__default.FC<IArrayForm>;

export { ArrayForm as default };
