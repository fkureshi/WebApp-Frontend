import React, { useState } from "react";
import FileUpload from "../../FileUpload/FileUpload";
import FormSection from "../../MultiStepForm/FormSection";
import ProgressBar from "../../ProgressBar/ProgressBar";
import styles from "./Reconciliation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { stepsAction } from "../../../store/steps";
import { formButtonAction } from "../../../store/formButton";

const Reconciliation = () => {
  const steps = useSelector((state) => state.steps.steps);
  const {
    showPrevButton: prevButton,
    showNextButton: nextButton,
    showSubmitButton: submitButton,
  } = useSelector((state) => state.formButton);
  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);

  const fileChangeHandler = (file) => {
    setFiles((prevState) => [...prevState, ...file]);
  };

  const fileRemoveHandler = (name) => {
    setFiles((prevState) => prevState.filter((file) => file.name !== name));
  };

  const prevButtonHandler = (e) => {
    if (steps - 1 === 1) {
      dispatch(formButtonAction.prevButton(false));
    } else {
      dispatch(formButtonAction.prevButton(true));
    }

    dispatch(formButtonAction.nextButton(true));
    dispatch(stepsAction.previous());
  };

  const nextButtonHandler = (e) => {
    if (steps + 1 === 3) {
      dispatch(formButtonAction.nextButton(false));
    } else {
      dispatch(formButtonAction.nextButton(true));
    }

    dispatch(formButtonAction.prevButton(true));
    dispatch(stepsAction.next());
  };

  return (
    <>
      <ProgressBar />
      <form action="" className={styles.form}>
        <FormSection
          currentStep={steps}
          defaultStep={1}
          className={styles.form__section}
          activeClassName={styles["form__section--active"]}
        >
          <FileUpload
            onUpload={fileChangeHandler}
            label=" "
            accept=".xlsx"
            files={files}
            onRemove={fileRemoveHandler}
            heading="Source Files Upload"
          />
        </FormSection>

        <FormSection
          currentStep={steps}
          defaultStep={2}
          className={styles.form__section}
          activeClassName={styles["form__section--active"]}
        >
          <div className={styles.section__header}>Step 2</div>
        </FormSection>

        <FormSection
          currentStep={steps}
          defaultStep={3}
          className={styles.form__section}
          activeClassName={styles["form__section--active"]}
        >
          <div className={styles.section__header}>Step 3</div>
        </FormSection>

        <div className={styles.form__navigation}>
          <button
            type="button"
            className={`${styles.form__button} ${styles["form__navigation--back"]}`}
            disabled={!prevButton}
            onClick={prevButtonHandler}
          >
            Previous
          </button>
          <button
            type="button"
            className={`${styles.form__button} ${styles["form__navigation--forward"]}`}
            disabled={!nextButton}
            onClick={nextButtonHandler}
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default Reconciliation;
