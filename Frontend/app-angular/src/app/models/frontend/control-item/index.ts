import { IIcon } from "../icon";

export type Value =  number | string | boolean;

export interface IControlItem{
  value: Value;
  label: string;
  icon?: IIcon;
}
