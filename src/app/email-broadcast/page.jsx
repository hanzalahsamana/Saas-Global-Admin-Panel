"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import React, { useState } from "react";
import FormInput from "@/Components/Forms/FormInput";
import FormikForm from "@/Components/Forms/Form";
import ToggleSwitch from "@/Components/Actions/ToggleSwitch";
import { emailValidationSchema } from "@/Utils/Validations/emailValidation";
import { useField, useFormikContext } from "formik";
import CustomDropdown from "@/Components/Actions/DropDown";
import EmailTemplate from "@/Components/UI/emailTemplate";
import TextEditor from "@/Components/UI/textEditor";

const AudienceDropdown = () => {
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField("audience");

  const options = [
    { label: "All Users", value: "All Users" },
    { label: "Premium Users", value: "Premium Users" },
    { label: "Inactive Users (30 days)", value: "Inactive Users (30 days)" },
  ];

  const handleAudienceSelect = (value) => {
    setFieldValue("audience", value);
  };

  return (
    <div className="my-4">
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

const EmailBroadcast = () => {
  const [scheduleNow, setScheduleNow] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [isAction, setIsAction] = useState(false);

  const initialValues = {
    subject: "",
    body: "",
    audience: "All Users",
    scheduleNow: true,
    scheduledAt: "",
    actionLink: "",
    actionText: "",
  };

  const handleSubmit = (values) => {
    const finalPayload = { ...values, scheduleNow };
    console.log("Broadcasting Email →", finalPayload);
  };

  return (
    <div className="p-6">
      <div className="flex gap-x-4 w-full">
        <div className="bg-white rounded-xl w-[50%] border border-(--borderC) p-6">
          <h2 className="text-2xl w-full font-semibold mb-4 text-gray-800">
            Send Email
          </h2>
          <FormikForm
            initialValues={initialValues}
            validationSchema={emailValidationSchema}
            handleSubmit={handleSubmit}
            buttonLabel="Send Email"
          >
            <FormInput
              name="subject"
              label="Email Subject"
              placeholder="Enter subject..."
            />
            <TextEditor
              editorContent={editorContent}
              setEditorContent={setEditorContent}
            />
            {/* <AudienceDropdown /> */}
            <div className="my-4">
              <ToggleSwitch
                label={"Action"}
                value={isAction}
                onChange={() => setIsAction((prev) => !prev)}
              />
            </div>
            {isAction && (
              <>
                {" "}
                <FormInput name="actionLink" placeholder="Action Link" />
                <FormInput name="actionText" placeholder="Action Text" />
              </>
            )}
            <div className="flex items-center gap-3 mb-6">
              <ToggleSwitch
                label="Send Now"
                value={scheduleNow}
                onChange={() => setScheduleNow((prev) => !prev)}
              />
              <span className="text-gray-600 text-sm">
                {scheduleNow
                  ? "Will be sent immediately"
                  : "Scheduled manually"}
              </span>
            </div>
            {!scheduleNow && (
              <FormInput
                name="scheduledAt"
                label="Schedule Date & Time"
                type="datetime-local"
                layout="label"
              />
            )}
          </FormikForm>
        </div>
        <div className="w-[50%] border border-(--borderC) rounded-xl flex justify-center">
          <EmailTemplate
            action={isAction}
            actionLabel={"Upload"}
            message={editorContent}
          />
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute(EmailBroadcast);
