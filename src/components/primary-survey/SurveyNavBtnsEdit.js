import { Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import firebase from "../../fire";

export const SurveyNavBtnsEdit = ({ onClick, currentStep, answers }) => {
  const handleSubmit = () => {
    const user = firebase.auth().currentUser.uid

    const answersObject = {
      name: answers[0],
      purpose: Object.keys(answers[1]),
      technologies: Object.keys(answers[2]),
      experience: Object.keys(answers[3]),
      about: answers[4],
      location: answers[5],
      projects: answers[6],
      avatarUrl: answers[7],
      github: answers[8],
      linkedin: answers[9],
      userUid: answers[10],
      userEmail: answers[11]
    }
    firebase.firestore().collection('Users').doc(user).set(answersObject)
  };

  return (
    <div className="next-prev-btns-section">
      <button
        className="next-prev-btn"
        onClick={() => {
          if (currentStep === 1) return currentStep;
          onClick(currentStep - 1);
        }}
      >
        <Typography variant="h6" color="primary">
          Previous
        </Typography>
      </button>

      {currentStep !== 4 && (
        <button
          className="next-prev-btn"
          onClick={() => {
            onClick(currentStep + 1);
          }}
        >
          <Typography variant="h6" color="primary">
            Next
          </Typography>
        </button>
      )}

      {currentStep === 4 && (
        <button className="next-prev-btn" onClick={() => handleSubmit()}>
          <NavLink to="/main-page">
            <Typography variant="h6" color="primary">
              Submit
            </Typography>
          </NavLink>
        </button>
      )}

      <button className={"skip-btn"}>
        <NavLink to="/profile-page">
          <Typography variant="h6" color="primary">
            Cancel
          </Typography>
        </NavLink>
      </button>
    </div>
  );
};
