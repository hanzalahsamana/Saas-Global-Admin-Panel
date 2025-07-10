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
              <Button
                type="submit"
                label={buttonLabel}
                loading={loading}
                size="large"
                className="!mt-[20px]"
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default FormikForm;
