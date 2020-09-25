import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { NewBallot, Election, ElectionAnswer } from "../models/models";

export type BallotProps = {
    onSaveBallot: (ballotForm: NewBallot) => void,
    election: Election,
    voterId: number,
    formIsSubmitting: boolean,
};
export function Ballot(props: BallotProps) {
    const initialBallotForm: ElectionAnswer[] = [];
    props.election.questions.map(q => initialBallotForm.push({question: q.question, voterResponse: "null"}))

    const [ ballotForm, updateBallotForm] = useState(initialBallotForm); 

    const browserHistory = useHistory();
    const navigateToConfirmationPage = () =>
    browserHistory.push(`/confirm`);

    const change = (e: ChangeEvent<HTMLSelectElement>) => {
        // If the updated field is one of the dynamic 'question' fields, update
        // the correct question in the questions array
        const updatedBallotAnswers = ballotForm.concat();
        const questionIndex = ballotForm.findIndex(electionAnswer => electionAnswer.question === e.target.id);
        updatedBallotAnswers[questionIndex].voterResponse = e.target.value;
        updateBallotForm(updatedBallotAnswers);
    };

    const submitBallot = () => {
        props.onSaveBallot({
            voterId: props.voterId,
            electionId: props.election.id,
            answers: ballotForm,
        });

        navigateToConfirmationPage();
    };

    const boolAnswerTypeOptions = () => {
        return [
            <option key='null' value="null">--</option>,
            <option key='true' value="true">True</option>,
            <option key='false' value="false">False</option>
        ];
    }
    
    return (
        <div className="form-container">
            <form>
                {props.election.questions.map(q =>  
                    <div key={q.question}>
                        <label>{q.question}</label>
                        <select id={q.question} onChange={change}>
                        {q.responseType === "bool" && boolAnswerTypeOptions()}
                        </select>
                    </div>)
                }
            </form>

            <button type="button" onClick={submitBallot}>Cast my vote</button>
        </div>
    );
}