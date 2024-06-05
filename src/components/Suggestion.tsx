import React from "react";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Suggestion as suggestionType, VoteOptions } from "../constants/TypesAndInterfaces";
interface SuggestionProps<T> {
  suggestion: T;
  index: string;
  inUpVotes: boolean;
  inDownVotes: boolean;
  handleVote: (options: VoteOptions<T>) => void;
}

const Suggestion = <T extends suggestionType> ({
  suggestion,
  index,
  inUpVotes,
  inDownVotes,
  handleVote,
}: SuggestionProps<T>) : React.ReactElement => {
  
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "1rem 0rem",
      }}
      key={index}
    >
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <span style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
          {suggestion.place}
        </span>{" "}
        <Button
          onClick={() =>{
            handleVote({suggestion, inUpVotes, inDownVotes,vote_type : "upvote"})
          }}
          type="primary"
          style={{ backgroundColor: inUpVotes ? "" : "grey" }}
        >
          <CaretUpOutlined />
        </Button>{" "}
        <Button
          onClick={() =>{
            handleVote({suggestion, inUpVotes, inDownVotes,vote_type : "downvote"})
          }}
          type="primary"
          style={{ backgroundColor: inDownVotes ? "" : "grey" }}
        >
          <CaretDownOutlined />
        </Button>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <span style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
          {suggestion?.upvote_count}
        </span>
        <span style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
          {suggestion?.downvote_count}
        </span>
      </div>
    </div>
  );
};

export default Suggestion;
