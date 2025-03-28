import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Gender from "../Gender";

const MobileLegend = (event) => {
  const [payment, setPayment] = useState(false);
  const [gender, setGender] = useState(null);
  console.log(gender);
  return (
    <div>
      <form className="grid gap-3">
        <label className="text-white text-2xl pt-7">Team Details :</label>
        <div className="grid grid-cols-3 gap-4 mb-2">
          <Input
            label={"Team Leader Name"}
            id={"teamLeader"}
            required={true}
            type={"text"}
          />
          <Input
            label={"Team Leader ID"}
            id={"teamLeaderId"}
            required={true}
            type={"number"}
          />
          <Gender onChange={setGender} required={true} />
          <Input
            label={"Player 2 Name"}
            id={"Player2"}
            required={true}
            type={"text"}
          />
          <Input
            label={"Player 2 ID"}
            id={"Player2Id"}
            required={true}
            type={"number"}
          />
          <Gender onChange={setGender} required={true} />
          <Input
            label={"Player 3 Name"}
            id={"Player3"}
            required={true}
            type={"text"}
          />
          <Input
            label={"Player 3 ID"}
            id={"Player3Id"}
            required={true}
            type={"number"}
          />
          <Gender onChange={setGender} required={true} />
          <Input
            label={"Player 4 Name"}
            id={"Player4"}
            required={true}
            type={"text"}
          />
          <Input
            label={"Player 4 ID"}
            id={"Player4Id"}
            required={true}
            type={"number"}
          />
          <Gender onChange={setGender} required={true} />
          <Input
            label={"Player 5 Name"}
            id={"Player5"}
            required={true}
            type={"text"}
          />
          <Input
            label={"Player 5 ID"}
            id={"Player5Id"}
            required={true}
            type={"number"}
          />
          <Gender onChange={setGender} required={true} />
          <Input
            label={"Substitute Name (Optional)"}
            id={"Player6"}
            type={"text"}
          />
          <Input
            label={"Substitute ID (Optional)"}
            id={"Player6Id"}
            type={"number"}
          />
          <Gender onChange={setGender} />
        </div>
        <div id="teamleader" className="mt-5">
          <label htmlFor="teamleader" className="text-white text-2xl pt-5"> Team Leader details:</label>
          <Input label={"Address"}
                 required={true}
                 type={"text"}
                 id={"address"}
          />
          <Input label={"Contact no."}
                 required={true}
                 type={"number"}
                 id={"contact"}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button label={"Continue"} type={"button"}/>
        </div>
      </form>
    </div>
  );
};

export default MobileLegend;
