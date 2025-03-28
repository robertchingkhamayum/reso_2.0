export default function DateOfBirth({ value, onChange }) {

    return (
      <div className="relative w-full pt-4">
        <label htmlFor="dob" className="block text-white text-sm mb-1">
          Date of Birth:
        </label>
        <input
          id="dob"
          name="dob"
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className="w-full border-0 border-b-2 border-zinc-800 bg-transparent px-2 py-3 text-white text-sm focus:outline-none focus:border-red-500 placeholder-transparent [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>
    );
  }
  