import React from 'react'
import './styles.scss';
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Form from './Form';
import { useVisualMode } from 'hooks/useVisualMode';
import { getInterview, getInterviewersForDay } from 'components/helpers/selectors';

export default function Appointment(props) {
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const { mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
)
function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    if (props.bookInterview(props.id, interview)) {
        transition(SHOW)
    }
  }

 return (
    <article className="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
        <Show
            student={props.interview.student}   
            interview={getInterview(props.interview.interviewer)}
            interviewers={props.interview.interviewer}
        />
    )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
    </article>
     )
}
