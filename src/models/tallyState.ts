import { Voter, Election, NewElection, Ballot } from "./models";

export type TallyState = {
  voters: Voter[];
  elections: Election[];
  electionsLoading: boolean;
  electionForm: NewElection;
  ballots: Ballot[];
};
