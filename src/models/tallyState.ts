import { 
  Voter,
  Election,
  NewElection,
  Ballot,
  VotersSort,
} from "./models";

export type TallyState = {
  voters: Voter[];
  votersSort: VotersSort;
  elections: Election[];
  electionsLoading: boolean;
  electionForm: NewElection;
  ballots: Ballot[];
  editVoterId: number;
};
