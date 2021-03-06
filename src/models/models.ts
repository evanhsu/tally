export type ElectionQuestion = {
  question: string;
  responseType: string;
};

export type ElectionAnswer = {
  question: string;
  voterResponse: string;
};

export type Voter = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  county: string;
  city: string;
  birthdate: string;
  email: string;
  phone: string;
  completedElectionIds: number[];
};

export type VoterKeys = "id" | "firstName" | "lastName" | "address" | 
  "county" | "city" | "birthdate" | "email" | "phone";

export type NewVoter = Omit<Voter, 'id'>;

export type Election = {
  id: number;
  name: string;
  questions: ElectionQuestion[];
};

export type NewElection= Omit<Election, 'id'>;
export const emptyElection = {
  id: -1,
  name: '',
  questions: [] as ElectionQuestion[],
};

export type Ballot = {
  id: number;
  electionId: number;
  voterId: number;
  answers: ElectionAnswer[];
};
export type NewBallot = Omit<Ballot, 'id'>;
export type BallotForm = {
  isSubmitting: boolean,
};

export type VotersSort = {
  col: keyof Voter,
  dir: string,
}

export type LoginInfo = {
  voterId: Voter["id"], 
  electionId: Election["id"]
}

export type VoterLoginForm = {
  authorizationInProgress: boolean,
  errorMessage: string,
}