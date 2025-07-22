"use client";
import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import React, { useState } from "react";
import FormInput from "@/Components/Forms/FormInput";
import FormTextArea from "@/Components/Forms/FormTextArea";
import FormDropdown from "@/Components/Forms/FormDropdown";
import FormikForm from "@/Components/Forms/Form";
import ToggleSwitch from "@/Components/Actions/ToggleSwitch";
import Table from "@/Components/Tables/Table";
import { emailValidationSchema } from "@/Utils/Validations/emailValidation";

const EmailBroadcast = () => {
  const [scheduleNow, setScheduleNow] = useState(false);

  const initialValues = {
    subject: "",
    body: "",
    audience: "All Users",
    scheduleNow: true,
    scheduledAt: "",
  };

  const handleSubmit = (values) => {
    const finalPayload = { ...values, scheduleNow };
    console.log("Broadcasting Email →", finalPayload);
  };

  const audienceOptions = [
    { label: "All Users", value: "All Users" },
    { label: "Premium Users", value: "Premium Users" },
    { label: "Inactive Users (30 days)", value: "Inactive Users" },
  ];

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
              layout="label"
            />
            <FormTextArea
              name="body"
              label="Email Body"
              placeholder="Write your message..."
              rows={6}
            />
            <FormDropdown
              name="audience"
              label="Target Audience"
              layout="label"
              options={audienceOptions}
            />
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
        <div className="w-[50%] p-6 border border-(--borderC) rounded-xl">
          <h2 className="text-2xl w-full font-semibold mb-4 text-gray-800">
            Previous Broadcast
          </h2>
          <Table
            columns={["subject", "date"]}
            data={[
              { subject: "Welcome to our platform", date: "Jul 1, 2025" },
              { subject: "July Sale is Live!", date: "Jul 10, 2025" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute(EmailBroadcast);
