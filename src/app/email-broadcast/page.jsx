"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import React, { useEffect, useState } from "react";
import FormInput from "@/Components/Forms/FormInput";
import FormikForm from "@/Components/Forms/Form";
import ToggleSwitch from "@/Components/Actions/ToggleSwitch";
import { emailValidationSchema } from "@/Utils/Validations/emailValidation";
import EmailTemplate from "@/Components/UI/emailTemplate";
import TextEditor from "@/Components/UI/textEditor";
import SearchBar from "@/Components/Search/SearchBar";
import { useField, useFormikContext } from "formik";
import CustomDropdown from "@/Components/Actions/DropDown";

const AudienceDropdown = ({ setSearchBarActive }) => {
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField("audience");

  const options = [
    { label: "All Users", value: "All Users" },
    { label: "Premium Users", value: "Premium Users" },
    { label: "Advance Users", value: "Advance Users" },
    { label: "Suspended Users", value: "Suspended Users" },
    { label: "Active Users", value: "Active Users" },
    { label: "Specific Users", value: "Specific Users" },
  ];

  const handleAudienceSelect = (value) => {
    if (value === "Specific Users") {
      setSearchBarActive(true);
    } else {
      setSearchBarActive(false);
    }
    setFieldValue("audience", value);
  };

  return (
    <div className="mb-6">
      <CustomDropdown
        dropdownData={options}
        dropdownHeading={values.audience || "Select Audience"}
        handleClick={handleAudienceSelect}
        isIcon={false}
        className="w-full"
        buttonClass="w-full"
      />
      {meta.error && (
        <div className="text-red-500 text-[13px] mt-2">{meta.error}</div>
      )}
    </div>
  );
};

const users = ["hanzalah", "ali", "de", "alicrv", "dede", "ded"];

const EmailBroadcast = () => {
  const [editorContent, setEditorContent] = useState("");
  const [isAction, setIsAction] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchBarActive, setSearchBarActive] = useState(false);

  const initialValues = {
    subject: "",
    body: "",
    audience: "All Users",
    actionLink: "",
    actionText: "Click",
  };

  const handleSubmit = (values) => {
    const finalPayload = { ...values };
    console.log("Broadcasting Email →", finalPayload);
  };

  const handleSearch = async (value) => {
    setSearchValue(value);
  };

  const handleUserSelect = (user) => {
    setSelectedUsers((prev) => {
      if (prev.includes(user)) {
        return prev.filter((u) => u !== user);
      }
      return [...prev, user];
    });
  };

  return (
    <div className="p-6">
      <FormikForm
        initialValues={initialValues}
        validationSchema={emailValidationSchema(isAction)}
        handleSubmit={handleSubmit}
        buttonLabel="Send Email"
      >
        <div className="flex gap-x-4 w-full">
          <div className="bg-white rounded-xl w-[50%] border border-(--borderC) p-6">
            <h2 className="text-2xl w-full font-semibold mb-4 text-gray-800">
              Send Email
            </h2>
            <AudienceDropdown setSearchBarActive={setSearchBarActive} />
            {searchBarActive && (
              <SearchBar
                handleSearch={handleSearch}
                searchValue={searchValue}
                placeholder="Search user..."
                suggestData={users}
                loading={false}
                isAction={false}
                className="!w-full !h-unset !mb-6"
                handleSubmit={handleUserSelect}
                selectedData={selectedUsers}
              />
            )}
            <FormInput
              name="subject"
              label="Email Subject"
              placeholder="Enter subject..."
              className="!mb-0"
            />
            <TextEditor
              editorContent={editorContent}
              setEditorContent={setEditorContent}
            />
            <div className="my-6">
              <ToggleSwitch
                label={"Action"}
                value={isAction}
                onChange={() => setIsAction((prev) => !prev)}
              />
            </div>
            {isAction && (
              <>
                {" "}
                <FormInput
                  name="actionLink"
                  type=""
                  placeholder="Action Link"
                />
                <FormInput name="actionText" placeholder="Action Text" />
              </>
            )}
          </div>
          <div className="w-[50%] border border-(--borderC) rounded-xl flex justify-center">
            <EmailTemplate
              action={isAction}
              actionLabel={"Upload"}
              message={editorContent}
            />
          </div>
        </div>
      </FormikForm>
    </div>
  );
};

export default ProtectedRoute(EmailBroadcast);
