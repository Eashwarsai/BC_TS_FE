import axios from "axios";
import { daysOfWeek, monthsOfYear } from "../constants/Constants";
import { User } from "../constants/TypesAndInterfaces";

export function formatMessage(data: string): string {
  const date: Date = new Date(data);
  const day: string = daysOfWeek[date.getDay()];
  const dayOfMonth: number = date.getDate();
  const month: string = monthsOfYear[date.getMonth()];
  const year: number = date.getFullYear();
  const hours: number = date.getHours();
  const minutes: string = String(date.getMinutes()).padStart(2, "0");
  const ampm: string = hours >= 12 ? "PM" : "AM";
  const formattedHours: number = hours % 12 || 12;

  const formattedDate: string = `${day} ${dayOfMonth}${getOrdinalSuffix(dayOfMonth)} ${month} ${year} at ${formattedHours}:${minutes} ${ampm}`;

  return formattedDate;
}


function getOrdinalSuffix(number : number) {
  const suffixes : string[] = ["th", "st", "nd", "rd"];
  const relevantDigits : number = number < 30 ? number % 20 : number % 30;
  const suffixIndex : number = relevantDigits <= 3 ? relevantDigits : 0;
  return suffixes[suffixIndex];
}

export const isValidLogin = async(user : User) =>{
  const data=await axios.get(`/users`)
  console.log(data?.data.findIndex((item : User)=>item.email===user.email)!==-1)
  return data?.data.findIndex((item: User)=>item.email===user.email)!==-1
}