import React from "react";
import "../styles/Washingmachine.css";

const Washingmachine = () => {
  return (
    <>
      <div className="wash">
        <div className="machine">
          <div className="loader" />
        </div>
        <img
          alt="..."
          className=""
          src={require("assets/img/fridge.gif")}
          width="150px"
        ></img>
        <img
          alt="..."
          className=""
          src={require("assets/img/air-conditioneri.png")}
          width="190px"
        ></img>
      </div>
    </>
  );
};

export default Washingmachine;

// At NR Services, we understand how essential your washing machine is
//             to your daily routine. That’s why we’ve expanded our platform to
//             include expert washing machine repair services. Whether your washing
//             machine is leaking, not spinning, or showing error codes, our
//             certified and experienced technicians are here to help.
