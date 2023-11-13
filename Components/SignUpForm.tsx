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
  // two states, one for form submission (essentially hides the form) and one for form data (right now it collects the data and logs to console, in future it would send a post to a database)
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

  // handles form submission
  const handleSubmit = (event: React.FormEvent) => {
    // standard prevent default
    event.preventDefault();
    // updated person is the data from the form
    const updatedPerson = onSubmit(formData);
    // in future we would send this data to a database
    // setFormSubmitted is switched to true hiding the form. Logic in return statement as ternary operator
    setFormSubmitted(true);
    // Logs the function found in app (random num gen (I thought it would be maybe an auth code))
    console.log("App function", updatedPerson.estimatedScore);
    // Logs the complete form data eg: bio: "I love in London", dateOfBirth: "1997-05-26", estimatedScore: 6, firstName: "Christian", job: "Firefighter", lastName: "Alteri", location: {city: 'London', country: 'United Kingdom', long: '-0.2472518', lat: '51.5463043', }selectedJobTitle: "Developer"
    console.log("Form submitted with data:", formData);
  };

  // handles input change for all input fields
  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

// handles input change for all dropdown fields (jobs)
  const handleDropdownChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedJobTitle: value,
    }));
  };

  // Hard coded logic and locations
  const handleLocationSelect = (
    selectedLocation: string,
    latitude: number,
    longitude: number
  ) => {
    let selectedCountry = "";

    if (selectedLocation === "London") {
      selectedCountry = "United Kingdom";
    }
    if (selectedLocation === "Paris") {
      selectedCountry = "France";
    }
    if (selectedLocation === "NewYork") {
      selectedCountry = "United States";
    }
    if (selectedLocation === "Sydney") {
      selectedCountry = "Australia";
    }

    setFormData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        city: selectedLocation,
        country: selectedCountry,
        lat: latitude.toString(),
        long: longitude.toString(),
      },
    }));
  };

  // Takes you 'back' to the form
  const handleReloadClick = () => {
    window.location.reload();
  };

  // The return statement is the form, if formSubmitted is true then it shows the auth code using ternary operator
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
                <GeoLocation onLocationSelect={handleLocationSelect} />
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
