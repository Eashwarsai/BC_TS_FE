import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Suggestion } from "../TypesAndInterfaces";

const addEvent = async (data : {event_name : string, event_status : string, event_date : string, user_id : string|null}) => {
  return await axios.post(`/events`, data);
};
const updateEventStatus = async (data : {event_id:string,to:string,suggestion_id?:string}) => {
  return await axios.patch(`/events?event_id=${data.event_id}&to=${data.to}&suggestion_id=${data.suggestion_id}`);
};

const addSuggestion = async (data : {place : string, category : string, event_id : string, is_chosen? : boolean}) => {
  return await axios.post(`/suggestions`, data);
};
const addOrUpdateVote = async (data: {vote_id : string|null, suggestion_id : string|null, user_id : string, vote_type : "upvote" | "downvote"}) => {
  return await axios.patch(`/votes`, data);
}
const updateAvailability = async (data: {availability_id : string|null, suggestion_id : string|null, user_id : string, is_available : boolean}) => {
  return await axios.patch(`/availability`, data);
}

export const useAddEvent = (user_id: string) => {
  const queryClient = useQueryClient();
  return useMutation(addEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries([`currentEvents`, user_id]);
    },
  });
};
export const useUpdateEventStatus = ( {event_status, user_id}:{event_status:string,user_id:string}) => {
  const queryClient = useQueryClient();
  return useMutation(updateEventStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries([`${event_status}Events`, user_id]);
    },
  });
};

export const useAddSuggestion = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuggestion, {
    onSuccess: () => {
      queryClient.invalidateQueries("currentEvents");
    },
  });
};
export const usePostorUpdateVote = () => {
  const queryClient = useQueryClient();
  return useMutation(addOrUpdateVote, {
    onSuccess: () => {
      queryClient.invalidateQueries("currentEvents");
    },
  });
};
export const useAddOrUpdateAvailability = (user_id : string) => {
  const queryClient = useQueryClient();
  return useMutation(updateAvailability, {
    onSuccess: () => {
      queryClient.invalidateQueries(["freezedEvents", user_id]);
    },
  });
}

