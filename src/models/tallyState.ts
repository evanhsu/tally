import { Voter, Election, Ballot } from "./models";

export type TallyState = {
  voters: Voter[];
  // elections: Election[];
  ballots: Ballot[];
};
