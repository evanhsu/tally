import React, { ChangeEvent } from "react";
import { NewElection } from "../models/models";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { TallyState } from "../models/tallyState";
import {
  createSetElectionFormAction,
  appendElection,
} from "../actions/electionActions";

// TODO: Move this somewhere else so it can be shared more easily
type HTMLFormControls =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export type ElectionFormProps = {
  form: NewElection;
  setForm: (form: NewElection) => void;
  saveElection: (electionForm: NewElection) => void;
};

export const ElectionForm = (props: ElectionFormProps) => {
  const { form, setForm, saveElection } = props;

  const change = (e: ChangeEvent<HTMLFormControls>) => {
    // If the updated field is one of the dynamic 'question' fields, update
    // the correct question in the questions array
    if (e.target.name.includes("question")) {
      const updatedQuestions = [...form.questions];
      updatedQuestions[Number(e.target.id)].question = e.target.value;

      setForm({
        ...form,
        questions: updatedQuestions,
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const addQuestion = () => {
    const newFormState = {
      name: form.name,
      questions: [
        ...form.questions,
        {
          question: "",
          responseType: "bool",
        },
      ],
    };

    setForm(newFormState);
  };

  const saveElectionThenNavigate = (electionForm: NewElection) => {

  };

  return (
    <div className="append-election-form-container">
      <h1>Plan a New Election</h1>
      <form className="append-election-form">
        <label>
          Election Name
          <input type="text" name="name" value={form.name} onChange={change} />
        </label>
          <label>Questions</label>
        <fieldset>
          <div className="election-question">
            {form.questions.map((question, idx) => (
              <input
                key={idx}
                type="text"
                id={String(idx)}
                name={`questions[${idx}]`}
                value={question.question}
                onChange={change}
              />
            ))}
            <button
          className="add-question-button"
          type="button"
          onClick={addQuestion}
        >
          Add Question
        </button>
          </div>
        </fieldset>
        
        <button
          className="save-election-button"
          type="button"
          onClick={() => saveElectionThenNavigate(form)}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export type ElectionFormContainerProps = {};
export const ElectionFormContainer = (props: ElectionFormContainerProps) => {
  const form = useSelector<TallyState, NewElection>(
    (state) => state.electionForm
  );

  // const history = useHistory();
  // const handleClick = () => history.push('/goodbye');

  const state = {
    form,
  };

  const dispatch = useDispatch();
  const actions = bindActionCreators(
    {
      setForm: createSetElectionFormAction,
      saveElection: appendElection,
    },
    dispatch
  );

  return <ElectionForm {...actions} {...state} />;
};
