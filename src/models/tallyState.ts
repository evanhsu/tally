import { 
  Voter,
  Election,
  NewElection,
  Ballot,
  BallotForm,
  VotersSort,
  VoterLoginForm,
} from "./models";

export type TallyState = {
  currentVoterId: Voter['id'];
  voterLoginForm: VoterLoginForm;
  voters: Voter[];
  votersSort: VotersSort;
  elections: Election[];
  electionsLoading: boolean;
  electionForm: NewElection;
  ballots: Ballot[];
  ballotsLoading: boolean;
  editVoterId: number;
  ballotForm: BallotForm;
};
