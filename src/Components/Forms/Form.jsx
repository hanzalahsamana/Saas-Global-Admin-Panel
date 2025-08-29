import React from "react";
import Button from "../Actions/Button";
import { Form, Formik } from "formik";

const FormikForm = ({
  children,
  handleSubmit,
  loading = false,
  buttonLabel,
  initialValues = {},
  validationSchema,
  isAction = true,
}) => {
  return (
    <>
      <Formik
        className="space-y-4 w-full"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <Form className="w-full">
              {children}
              {isAction && (
                <Button
                  type="submit"
                  label={buttonLabel}
                  loading={loading}
                  size="large"
                  className="!mt-2 hover:scale-[1.02] stop-text-reflection "
                />
              )}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default FormikForm;
