import { 
  Voter,
  Election,
  Ballot,
  VotersSort 
} from "./models";

export type TallyState = {
  voters: Voter[];
  votersSort: VotersSort;
  // elections: Election[];
  ballots: Ballot[];
  editVoterId: number;
};
