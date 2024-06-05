import React, { useState } from "react";
import InputSuggestion from "./InputSuggestion";
import {
  usePostorUpdateVote,
  useUpdateEventStatus,
} from "../constants/query/PostQuery";
import AdminOperation from "./Admin/AdminOperation";
import EventDetails from "./EventDetails/EventDetails";
import Suggestion from "./Suggestion";
import { Button, FormInstance, Modal } from "antd";
import CollectionCreateForm from "./Modal/CollectionCreateForm";
import { PostEventToSlack } from "../constants/Slack";
import useUserContext from "../constants/customHooks/userContextHook";
import { CurrentEvent, CurrentSuggestion, VoteOptions } from "../constants/TypesAndInterfaces";
interface SuggestionCardProps {
  event: CurrentEvent;
}

const SuggestionCard : React.FC<SuggestionCardProps> = ( { event }) => {
  const { currentUser } = useUserContext();
  const [open, setOpen] = useState<boolean>(false);
  const [inputModal, setInputModal] = useState<boolean>(false);
  const [formInstance, setFormInstance] = useState<FormInstance>();
  const { mutate: updateEventStatus } = useUpdateEventStatus({
    event_status: event.event_status,
    user_id: currentUser?.user_id || '',
  });
  const { mutate: updateVotes } = usePostorUpdateVote();
  const handleFreeze = () => {
    setOpen(!open);
  };
  const handleOk = async () => {
    try {
      const values = await formInstance?.validateFields();
      formInstance?.resetFields();
      const suggestion = values.suggestion;
      const data = { 
        event_id : event.event_id,
        suggestion_id: suggestion.suggestion_id,
        to: 'freezed'
      }
      updateEventStatus(data)
      const message = `We have finalized "${values.suggestion.place}", for the event "${event.event_name}" based on voting count and feasibility`;
      const notifyInSlack = await PostEventToSlack(
        "https://hooks.slack.com/services/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",
        { message: message }
      );
      console.log(notifyInSlack);
    } catch (e) {
      console.log('Error',e);
    }
  };
  const handleVote = ({suggestion, inUpVotes, inDownVotes,vote_type}:VoteOptions<CurrentSuggestion>) => {
    if (inUpVotes && (vote_type === 'upvote') ) return;
    if (inDownVotes && (vote_type === 'downvote') ) return;
    const data = {
      vote_id : suggestion.vote_id,
      suggestion_id : suggestion.suggestion_id,
      user_id : currentUser?.user_id || '',
      vote_type: vote_type
    };
     updateVotes(data);
  };
  
  return (
    <div
      style={{
        width: "100%",
        padding: "1rem",
        backgroundColor: "aliceblue",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <EventDetails name={event.event_name} date={event.event_date} />
      <div style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
        suggestions:
      </div>
      <div>
        { (event?.suggestions?.map((suggestion, index) => {
          let inUpVotes = false
          let inDownVotes =false
          if(suggestion.user_vote_type){
            inUpVotes=suggestion.user_vote_type === "upvote" ;
            inDownVotes= suggestion.user_vote_type=== "downvote" ;
          }
          
          return (
            suggestion?.suggestion_id && <Suggestion
              key={index}
              suggestion={suggestion}
              index={event.event_id.toString()}
              handleVote={handleVote}
              inUpVotes={inUpVotes}
              inDownVotes={inDownVotes}
            />
          );
        }))}
        <Button type="primary" onClick={() => setInputModal(!inputModal)}>
          Add suggestion
        </Button>
      </div>
      <Modal
        open={inputModal}
        title="Add suggestion"
        cancelText="close"
        centered
        onCancel={() => setInputModal(false)}
        footer={[
          <Button key="back" onClick={() => setInputModal(false)}>
            Close
          </Button>,
        ]}
      >
        <InputSuggestion key={event.event_id.toString()} event={event} />
      </Modal>
      <AdminOperation onClick={handleFreeze}>Freeze Event</AdminOperation>
      <Modal
        open={open}
        title="Finalize the destination"
        okText="Freeze suggestion"
        cancelText="Cancel"
        centered
        onCancel={() => setOpen(false)}
        onOk={handleOk}
      >
        <CollectionCreateForm
          onFormInstanceReady={(instance : FormInstance) => {
            setFormInstance(instance);
          }}
          data={[...event.suggestions]}
          name={"freezeform"}
        />
      </Modal>
    </div>
  );
};

export default SuggestionCard;
