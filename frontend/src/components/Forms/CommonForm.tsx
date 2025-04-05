import Input from "../Input";
import { useState } from "react";
import Button from "../Button";
import Gender from "../Gender";

interface CommonFormProps {
  event?: string;
}

const CommonForm: React.FC<CommonFormProps> = ({ event }) => {
  const [gender, setGender] = useState<string | null>(null);
  console.log("Selected Event:", event);
  console.log("Gender:", gender);

  return (
    <div>
      <form>
        <label className="text-white text-2xl pt-7">Personal Details :</label>
        <div>
          <Input label="Name" id="name" required type="text" />
          <Gender onChange={setGender} required />
          <div id="personal_details" className="mt-5">
            <Input label="Address" required type="text" id="address" />
            <Input label="Contact no." required type="number" id="contact" />
          </div>
          <div className="flex items-center justify-center">
            <Button label="Continue" type="button" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommonForm;
