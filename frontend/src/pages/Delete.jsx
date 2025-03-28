import Button from "../components/Button";
import Input from "../components/Input";

const Delete = ({ onChange, onClickCancel, onClickDelete }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-zinc-950/75">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
        <Input
        id={"password"}
          label="Enter Your Password"
          placeholder="Password"
          onChange={(e) => onChange(e.target.value)}
          type="password"
          required={true}
        />
        <div className="flex justify-between mt-4">
          <Button label="Cancel" type="button" onClick={onClickCancel} />
          <Button label="Delete" type="button" onClick={onClickDelete} />
        </div>
      </div>
    </div>
  );
};

export default Delete;
