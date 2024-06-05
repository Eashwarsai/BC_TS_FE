 export interface User {
    user_id: string;
    username: string;
    email: string;
    password: string;
    is_admin: boolean;
}
export interface UserContextProps {
  currentUser: User | null | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
}
// Common interface for a suggestion
export interface Suggestion {
  suggestion_id: string;
  place: string;
  category: string;
  upvote_count: number;
  downvote_count: number;
}

// Interface for finished event suggestions
interface FinishedSuggestion extends Suggestion {}

// Interface for freezed event suggestions
export interface FreezedSuggestion extends Suggestion {
  user_vote_type: boolean;
  availability_id: string;
}

// Interface for current event suggestions
export interface CurrentSuggestion extends Suggestion {
  user_vote_type: string;
  vote_id: string;
}

// Common interface for an event
export interface Event<T extends Suggestion> {
  event_id: string;
  event_date: string;
  event_status: string;
  event_name: string;
  suggestions: T[];
}
export type VoteOptions<T> = {
  suggestion: T;
  inUpVotes: boolean;
  inDownVotes: boolean;
  vote_type: "upvote" | "downvote";
};
// Interface for finished event
export type FinishedEvent = Event<FinishedSuggestion>;

// Interface for freezed event
export type FreezedEvent = Event<FreezedSuggestion>;

// Interface for current event
export type CurrentEvent = Event<CurrentSuggestion>;


// export { User, UserContextProps , Event, FinishedEvent,VoteOptions, FreezedEvent, CurrentEvent, Suggestion, FinishedSuggestion, FreezedSuggestion, CurrentSuggestion };