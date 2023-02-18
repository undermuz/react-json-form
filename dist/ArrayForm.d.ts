import React__default from 'react';
import { T as TypeValueItem, I as ISchemeItem } from './types-f66b7c24.js';
import '@undermuz/use-form/build/types/useForm';
import '@undermuz/use-form/build/types/useForm/reducer';

interface IArrayForm {
    value: TypeValueItem[];
    primary?: boolean;
    defValue: TypeValueItem;
    scheme: ISchemeItem[];
    onChange: Function;
}
declare const ArrayForm: React__default.FC<IArrayForm>;

export { ArrayForm as default };
