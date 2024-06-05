import { useFreezedEvents } from "../../constants/query/FetchQuery";
import EventDetails from "../EventDetails/EventDetails";
import AdminOperation from "../Admin/AdminOperation";
import {
  useAddOrUpdateAvailability,
  useUpdateEventStatus,
} from "../../constants/query/PostQuery";
import Suggestion from "../Suggestion";
import useUserContext from "../../constants/customHooks/userContextHook";
import { FreezedEvent, FreezedSuggestion, VoteOptions } from "../../constants/TypesAndInterfaces";
import React from "react";

const Freezed = () => {
  const { currentUser }  = useUserContext();
  const user_id : string = currentUser?.user_id || '';
  const { data, isLoading } = useFreezedEvents(user_id);
  const { mutate: updateAvailability } = useAddOrUpdateAvailability(user_id);
  const { mutate: updateEventStatus } = useUpdateEventStatus({event_status:'freezed',user_id});
  const moveToFinishedHandler = (event:FreezedEvent) => {
    const data : {event_id : string, to : string} = { 
      event_id : event.event_id,
      to: 'finished'
    }
    updateEventStatus(data)
  };
  
  const handleVote = ({suggestion , inUpVotes , inDownVotes,vote_type} : VoteOptions<FreezedSuggestion>) => {
    if (inUpVotes && (vote_type === 'upvote') ) return;
    if (inDownVotes && (vote_type === 'downvote') ) return;
    const data = {
      availability_id : suggestion.availability_id,
      suggestion_id : suggestion.suggestion_id,
      user_id : currentUser?.user_id || '',
      is_available: vote_type==="upvote"
    };
    updateAvailability(data) 
  };
  
  if (isLoading) return <div>Loading</div>;
  return (
    <div>
      {data?.length === 0 ? <div>No events found</div> :  data?.map((item : FreezedEvent, index : Number) => {
        const inUpVotes = item?.suggestions[0]?.user_vote_type?.toString()==="1"
        const inDownVotes =item?.suggestions[0]?.user_vote_type?.toString()==="0"
        return (
          <div
            key={item.event_id}
            style={{
              backgroundColor: "aliceblue",
              padding: "1rem",
              margin: "0.5rem",
              borderRadius: "0.5rem",
            }}
          >
            <EventDetails name={item.event_name} date={item.event_date} />
            <h1 style={{color:"blue"}}>Confirm your Availability :</h1>
            <Suggestion
              suggestion={item.suggestions[0]}
              index={index.toString()}
              inUpVotes={inUpVotes}
              inDownVotes={inDownVotes}
              handleVote={handleVote}
            />
            <AdminOperation onClick={() => moveToFinishedHandler(item)}>
              Mark as done
            </AdminOperation>
          </div>
        );
      })}
    </div>
  );
};

export default Freezed;
