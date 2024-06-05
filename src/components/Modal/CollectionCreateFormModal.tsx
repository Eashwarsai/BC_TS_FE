import { FormInstance, Modal } from "antd";
import CollectionCreateForm from "./CollectionCreateForm";
import { useContext, useState } from "react";
import { useAddEvent } from "../../constants/query/PostQuery";
import UserContext from "../../context/UserContext";
import { PostEventToSlack } from "../../constants/Slack";
import { formatMessage } from "../../utils/utils";
import useUserContext from "../../constants/customHooks/userContextHook";
import React from "react";

const CollectionCreateFormModal = () => {
  const [formInstance, setFormInstance] = useState<FormInstance>();
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { currentUser } = useUserContext();
  const { mutate } = useAddEvent(currentUser?.user_id || ""); 
  if(!currentUser) return null
  const handleOk = async () => {
    try {
      const values = await formInstance?.validateFields();
      console.log(values);
      formInstance?.resetFields();
      setOpen(false);

      const data : {event_name : string, event_date : string, event_status : string, user_id : string|null} = {
        event_name: values?.EventName,
        event_date: values?.DateAndTime["$d"],
        event_status:'current',
        user_id : currentUser?.user_id
      };
      console.log(data)
      const message = `we are planning for an event "${
        data.event_name
      }" on "${formatMessage(
        data?.event_date
      )}" please post your suggestions in the Events application`;
      mutate(data);
      const notifyInSlack = await PostEventToSlack(
        "https://hooks.slack.com/services/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",
        { message: message }
      );
      setError("");
    } catch (error) {
      setError("failed, Retry!");
    }
  };

  return (
    <>
      { currentUser?.is_admin?.toString() === "1" && (
        <div
          onClick={() => setOpen(true)}
          style={{
            width: "100%",
            textAlign: "center",
            border: "2px solid black",
          }}
        >
          <h1>+</h1>
        </div>
      )}
      <Modal
        open={open}
        title="Create a new collection"
        okText="Create"
        cancelText="Cancel"
        centered
        onCancel={() => setOpen(false)}
        onOk={handleOk}
      >
        <CollectionCreateForm
          onFormInstanceReady={(instance) => {
            setFormInstance(instance);
          } }
          name={"eventForm"} data={undefined}        />
        {error && <div>{error}</div>}
      </Modal>
    </>
  );
};
export default CollectionCreateFormModal;
