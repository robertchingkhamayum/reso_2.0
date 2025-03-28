export default function Gender({ onChange ,required = false, }) {
    return (
      <div className="w-full flex items-center justify-center mt-3">
        <select
          id="gender"
          name="gender"
          required={required}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
    );
  }
  