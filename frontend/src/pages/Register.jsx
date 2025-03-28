import React, { useState } from "react";
import Select from "react-select";
import Pubg from "../components/Forms/Bgmi";
import MobileLegend from "../components/Forms/MobileLegend";
import { quantum } from "ldrs";
import CommonForm from "../components/Forms/CommonForm";
import CommonGames from "../components/Forms/CommonGames"



// Default values shown

const customStyles = {
  menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
  control: (base) => ({
    ...base,
    backgroundColor: "#1f2937",
    borderColor: "#374151",
    color: "white",
    "&:hover": { borderColor: "#4b5563" },
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? "#2563eb" : isFocused ? "#374151" : "#1f2937",
    color: isSelected ? "white" : "#d1d5db",
    padding: "10px",
  }),
  singleValue: (base) => ({
    ...base,
    color: "white",
  }),
  input: (base) => ({
    ...base,
    color: "white",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#d1d5db",
  }),
};

const Register = () => {
  quantum.register();
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: "structural_modelling", label: "Structural Modelling (Technical Event)" },
    { value: "autocad_design", label: "Autocad Design (Technical Event)" },
    { value: "code_debugging", label: "Code Debugging (Technical Event)" },
    { value: "code_jumbling", label: "Code Jumbling (Technical Event)" },
    { value: "project_showcase", label: "Project Showcase (Technical Event)" },
    { value: "circuit_design", label: "Circuit Design (Technical Event)" },
    { value: "paper_windmill", label: "Paper Windmill (Technical Event)" },
    { value: "machine_design_autocad", label: "Machine Design Autocad (Technical Event)" },
    { value: "electrical_component", label: "Electrical Component Identification & Modelling (Technical Event)" },
    { value: "painting", label: "Painting (Spot Event)" },
    { value: "photography", label: "Photography (Spot Event)" },
    { value: "treasure_hunt", label: "Treasure Hunt (Spot Event)" },
    { value: "rubik_cube", label: "Rubik's Cube (Spot Event)" },
    { value: "quiz", label: "Quiz (Literary Event)" },
    { value: "debate", label: "Debate (Literary Event)" },
    { value: "tekken", label: "Tekken 7 (Gaming)" },
    { value: "bgmi", label: "Bgmi (Gaming)" },
    { value: "mobile_legend", label: "Mobile Legend (Gaming)" },
    { value: "fc24", label: "FC24 (Gaming)" },
    { value: "light_vocal", label: "Light Vocal Solo (Voice of RESO)" },
    { value: "western_solo", label: "Western Solo Unplugged (Voice of RESO)" },
    { value: "classical&folk", label: "Classical & Folk (Dance Contest)" },
    { value: "modern", label: "Modern (Dance Contest)" },
    { value: "cosplay", label: "Cosplay Contest" },
    { value: "reel", label: "Reel Contest" },
  ];

  return (
    <div className="bg-black flex items-center justify-center ">
      <div className="pt-2 w-3/5 ">
        <h1 className="text-3xl text-white mb-3">Event to participate -</h1>
        <Select
          value={selectedOption}
          onChange={setSelectedOption}
          options={options}
          isSearchable
          placeholder="Event"
          className="text-white mb-2"
          styles={customStyles}
          menuContainerStyle={{ zIndex: 5 }}
          menuPortalTarget={document.body}
          menuPosition="fixed"
        />

        {selectedOption?.value === "structural_modelling" ? (
          <CommonForm event = {selectedOption.value}/>
        ) :selectedOption?.value === "autocad_design" ? (
          <CommonForm event = {selectedOption.value}/>
        ) :selectedOption?.value === "code_debugging" ? (
          <CommonForm event = {selectedOption.value}/>
        ) :selectedOption?.value === "code_jumbling" ? (
          <CommonForm event = {selectedOption.value}/>
        ) :selectedOption?.value === "project_showcase" ? (
          <CommonForm event = {selectedOption.value}/>
        ) :selectedOption?.value === "circuit_design" ? (
          <CommonForm event = {selectedOption.value}/>
        ) :selectedOption?.value === "paper_windmill" ? (
          <CommonForm event = {selectedOption.value}/>
        ) :selectedOption?.value === "machine_design_autocad" ? (
          <CommonForm event = {selectedOption.value}/>
        ) :selectedOption?.value === "electrical_component" ? (
          <CommonForm event = {selectedOption.value}/>
        ) :selectedOption?.value === "machine_design_autocad" ? (
          <CommonForm event = {selectedOption.value}/>
        ) :selectedOption?.value === "painting" ? (
          <CommonForm event = {selectedOption.value}/>
        ) : selectedOption?.value === "photography" ? (
          <CommonForm event = {selectedOption.value}/>
        ) : selectedOption?.value === "treasure_hunt" ? (
          <CommonForm event = {selectedOption.value}/>
        ) : selectedOption?.value === "rubik_cube" ? (
          <CommonForm event = {selectedOption.value}/>
        ) : selectedOption?.value === "quiz" ? (
          <CommonForm event = {selectedOption.value}/>
        ) : selectedOption?.value === "debate" ? (
          <CommonForm event = {selectedOption.value}/>
        ) :selectedOption?.value === "tekken" ? (
          <CommonGames event = {selectedOption.value}/>
        ) : selectedOption?.value === "bgmi" ? (
          <Pubg event = {selectedOption.value}/>
        ) : selectedOption?.value === "mobile_legend" ? (
          <MobileLegend event = {selectedOption.value}/>
        ) : selectedOption?.value === "fc24" ? (
          <CommonGames event = {selectedOption.value}/>
        ) : selectedOption?.value === "light_vocal" ? (
          <CommonForm event = {selectedOption.value}/>
        ) : selectedOption?.value === "western_solo" ? (
          <CommonForm event = {selectedOption.value}/>
        ) : selectedOption?.value === "classical&folk" ? (
          <CommonForm event = {selectedOption.value}/>
        ) : selectedOption?.value === "modern" ? (
          <CommonForm event = {selectedOption.value}/>
        ) : selectedOption?.value === "cosplay" ? (
          <CommonForm event = {selectedOption.value}/>
        ) : selectedOption?.value === "reel" ? (
          <CommonForm event = {selectedOption.value}/>
        ) :(
          <div className="h-dvh flex justify-center items-center">
            <l-quantum size="150" speed="4" color="blue"></l-quantum>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
