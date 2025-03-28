import Input from "../Input";
import { useState } from "react";
import Button from "../Button";
import Gender from "../Gender";

const CommonForm = (event) => {
  const[gender, setGender] = useState(null);
  console.log(gender);

  return (
    <div>
      <form>
      <label className="text-white text-2xl pt-7">Personal Details :</label>
        <div className="">
          <Input 
            label={"Name"}
            id={"name"}
            required={true}
            type={"text"}
          />
          <Gender onChange={setGender} required={true} />
          <div id="personal_details" className="mt-5">
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
        </div>
      </form>
    </div>
  );
};

export default CommonForm;
