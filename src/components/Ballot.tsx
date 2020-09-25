import React, { ChangeEvent, useState } from "react";
import { useForm } from "../hooks/useForm";
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
    };

    const boolAnswerTypeOptions = () => {
        return [
            <option value="null">--</option>,
            <option value="true">True</option>,
            <option value="false">False</option>
        ];
    }
    
    return (
        <>
            <form>
                {props.election.questions.map(question =>  
                    <>
                        <label>{question.question}</label>
                        <select id={question.question}>
                        {question.responseType === "bool" && boolAnswerTypeOptions()}
                        </select>
                    </>)
                }
            </form>

            <button type="button" onClick={submitBallot}>Cast my vote</button>
        </>
    );
}