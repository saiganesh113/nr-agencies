import React from "react";
import "../styles/Washingmachine.css";

const Washingmachine = () => {
  return (
    <>
      <div className="wash">
        <div className="machine">
          <div className="loader" />
        </div>
        <h5>
          At NR Services, we know how vital your appliances are to your daily
          life. That's why we offer expert repair services for both ACs and
          washing machines. Whether it's a cooling issue or a spin problem, our
          certified technicians are ready to assist.
        </h5>
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
