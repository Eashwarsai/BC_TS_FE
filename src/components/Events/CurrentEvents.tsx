import CollectionCreateFormModal from "../Modal/CollectionCreateFormModal";
import { CurrentEvents } from "../../constants/query/FetchQuery";
import SuggestionCard from "../SuggestionCard";
import useUserContext from "../../constants/customHooks/userContextHook";
import { CurrentEvent } from "../../constants/TypesAndInterfaces";
import React from "react";

const Current = () => {
  const {currentUser} = useUserContext();
  const user_id : string=currentUser?.user_id || '';
  const { isLoading, data } = CurrentEvents(user_id);
  console.log(data)
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        gap: "12px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <div>isLoading..</div>
      ) : (
        data?.length === 0 ? <div> currently no ongoing events are here </div> : data?.map((item:CurrentEvent) => <SuggestionCard key={item.event_id} event={item} />)
      )}
      <CollectionCreateFormModal />
    </div>
  );
};

export default Current;
