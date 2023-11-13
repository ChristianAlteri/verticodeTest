// SignUpForm.tsx

import React, { useState } from "react";
import Dropdown from "./DropDown";
import Input from "./Input";
import IPerson from "../models/Person";
import DateInput from "./DateInput";
import GeoLocation from "./GeoLocation";


interface SignUpFormProps {
  onSubmit: (person: IPerson) => IPerson;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: new Date("yyyy-MM-dd"),
    selectedJobTitle: "",
    bio: "",
    estimatedScore: 0,
    job: "Firefighter",
    location: {
      city: "",
      country: "",
      long: "",
      lat: "",
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleDropdownChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedJobTitle: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedPerson = onSubmit(formData);
    setFormSubmitted(true);
    console.log("App function", updatedPerson.estimatedScore);
    console.log("Form submitted with data:", formData);
  };

  const handleReloadClick = () => {
    window.location.reload(); 
  };

  return (
    <div>
      {!formSubmitted && (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                id="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={(value) => handleInputChange("firstName", value)}
              />
              <Input
                id="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={(value) => handleInputChange("lastName", value)}
              />
              <DateInput
                id="dateOfBirth"
                label="Date of birth"
                value={formData.dateOfBirth}
                onChange={(value) => handleInputChange("dateOfBirth", value)}
              />
              <Dropdown
                id="selectedJobTitle"
                label="Job Title"
                options={[
                  "Firefighter",
                  "Police Officer",
                  "Astronaut",
                  "Developer",
                ]}
                value={formData.selectedJobTitle}
                onChange={handleDropdownChange}
              />
              <Input
                id="bio"
                label="Biography"
                value={formData.bio}
                onChange={(value) => handleInputChange("bio", value)}
              />
              <div>
              <GeoLocation
              
              />
                <button
                  type="submit"
                  className="flex justify-center border text-center rounded-md px-3 py-2 text-sm font-semibold w-full hover:bg-emerald-200 hover:cursor-pointer"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {formSubmitted ? (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div
            className="
            flex
        bg-white
        text-sm 
        font-medium
         text-gray-700
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
          justify-center
          hover:bg-red-200
          hover:cursor-pointer
        "
        onClick={handleReloadClick}
          >
            Your Auth Code
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Made by Christian
              </span>
            </div>
          </div>
        </div>
      )}

      {formSubmitted && (
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
           {formData.estimatedScore}
        </div>
        
      )}
    </div>
  );
};

export default SignUpForm;
