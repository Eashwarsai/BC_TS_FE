import { Button } from "antd";
import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import useUserContext from "../../constants/customHooks/userContextHook";

const AdminOperation = ( {children, onClick }: {children: React.ReactNode, onClick: () => void}) => {
  const { currentUser } = useUserContext();
  return currentUser?.is_admin.toString()==="1" ? (
    <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
      <Button type="primary" onClick={onClick}>
        {children}
      </Button>
    </div>
  ) : (
    ""
  );
};

export default AdminOperation;
