import React, { useState } from "react";
import { MyDatePicker } from "../components";

const Settings = () => {
  const [test, setTest] = useState(new Date("8-17-2007"));

  const tddd = () => {
    setTest(new Date(test));
    console.log(test);
  };
  return (
    <div>
      <MyDatePicker finalDate={test} setFinalDate={setTest} />
      <button onClick={tddd}>ggggg</button>
    </div>
  );
};

export default Settings;
