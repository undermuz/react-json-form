import { FC } from "react";
interface IDateSelect {
    value: string | null;
    onChange: Function;
}
declare const DateSelect: FC<IDateSelect>;
export default DateSelect;
