"use client";

import { useFormikContext } from "formik";
import Button from "../Actions/Button";

export default function EmailTemplate({
  subject = "Welcome to Multi Tenant",
  message = "Thank you for joining us!",
  footerText = "© 2025 Multi Tenant. All rights reserved.",
  action,
  actionLabel,
}) {
  const { setFieldValue, values } = useFormikContext();
  return (
    <div className=" max-w-[500px] w-full p-6 flex justify-center items-center">
      <div className="max-w-xl w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <div className="bg-blue-600 p-4 text-white text-center text-2xl font-bold">
          MULTI TENANT
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Hi [User Name],
          </h2>
          <div dangerouslySetInnerHTML={{ __html: message }} />
          {action && (
            <div className="flex justify-center mt-2">
              {" "}
              <Button
                variant="black"
                label={values.actionText}
                action={() => window.open(values?.actionLink, "_blank")}
              />
            </div>
          )}
        </div>

        <div className="bg-gray-100 text-gray-500 text-center text-sm py-4 border-t border-gray-200">
          {footerText}
        </div>
      </div>
    </div>
  );
}
