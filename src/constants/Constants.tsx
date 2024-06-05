import {
  UserOutlined,
  HomeOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { ForwardRefExoticComponent, RefAttributes } from "react";
export const NavIcons : string[] = ["current", "freezed" ,"finished"];
export const SliderFeilds : {icon:ForwardRefExoticComponent<Omit<AntdIconProps, "ref"> & RefAttributes<HTMLSpanElement>>,key:string}[] = [
  { icon: HomeOutlined , key: "home"  },
  { icon: PieChartOutlined, key: "analytics" },
  { icon : UserOutlined , key: "admin"}
];
export const categories : {key:string,label:string}[] = [
  {
    key: "Sports",
    label: "Sports",
  },
  {
    key: "Food",
    label: "Food",
  },
  {
    key: "BoardGames",
    label: "BoardGames",
  },
];

const daysOfWeek : string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthsOfYear : string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export {daysOfWeek,monthsOfYear}