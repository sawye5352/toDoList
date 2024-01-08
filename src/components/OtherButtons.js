import React, { useState } from "react";

export default function OtherButtons({ clearCompleted, filterByAll, filterByActive, filterByCompleted}) {

  let [allStatus, setAllStatus] = useState(true);

  let [activeStatus, setActiveStatus] = useState(false);

  let [completedStatus, setCompletedStatus] = useState(false);

  let allOnClickHandler = () => {
    setAllStatus(true)
    filterByAll()
    setActiveStatus(false)
    setCompletedStatus(false)
  }

  let activeOnClickHandler = () => {
    setActiveStatus(true)
    filterByActive()
    setAllStatus(false)
    setCompletedStatus(false)
  }

  let completedOnClickHandler = () => {
    setCompletedStatus(true)
    filterByCompleted()
    setAllStatus(false)
    setActiveStatus(false)
  }

  return (
    <div className="other-buttons-container">
      <div>
        <button className={`button filter-button ${allStatus ? "filter-button-active" : ""}`} onClick={allOnClickHandler}>All</button>
        <button className={`button filter-button ${activeStatus ? "filter-button-active" : ""}`} onClick={activeOnClickHandler}>Active</button>
        <button className={`button filter-button ${completedStatus ? "filter-button-active" : ""}`} onClick={completedOnClickHandler}>Completed</button>
      </div>
      <div>
        <button className="button" onClick={clearCompleted}>
          Clear completed
        </button>
      </div>
    </div>
  );
}
