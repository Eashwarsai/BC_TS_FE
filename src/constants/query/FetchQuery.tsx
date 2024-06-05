import axios from "axios";
import { useQuery } from "react-query";
import { CurrentEvent, FinishedEvent, FreezedEvent } from "../TypesAndInterfaces";

const FetchCurrentEvents = async(user_id : string) =>{
  const response = await axios.get(`/events?event_status=current&user_id=${user_id}`);
  return response.data;
}
const FetchFreezedEvents = async(user_id : string) =>{
  const response = await axios.get(`/events?event_status=freezed&user_id=${user_id}`);
  return response.data;
}
const FetchFinishedEvents = async() : Promise<FinishedEvent[]> =>{
  const response = await axios.get(`/events?event_status=finished`);
  return response.data;
}
export const CurrentEvents = (user_id: string) => {
  return useQuery<CurrentEvent[],Error>(['currentEvents',user_id],()=>FetchCurrentEvents(user_id));
}
export const useFreezedEvents = (user_id : string) => {
  return useQuery<FreezedEvent[],Error>(['freezedEvents',user_id],()=>FetchFreezedEvents(user_id));
}
export const useFinishedEvents = () => {
  return useQuery<FinishedEvent[],Error>('finishedEvents',FetchFinishedEvents);
}