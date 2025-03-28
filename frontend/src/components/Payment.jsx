import Input from "./Input";

const Payment = ({ money, onClose, handleRegister }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-zinc-950/75">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl text-white font-bold mb-4">Edit Profile</h2>
        <label className="text-white">Payment</label>
        <Input label={"Transaction Id"} type={"number"} required={true} />
        <div className="mt-4 flex justify-end gap-2">
          <Button label={"Back"} type={"button"} onClick={onClose} />
          <Button label={"Register"} onClick={handleRegister} type={"submit"} />
        </div>
      </div>
    </div>
  );
};
export default Payment;
