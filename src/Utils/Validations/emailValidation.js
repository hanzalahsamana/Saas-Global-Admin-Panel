import * as Yup from "yup";

const allowedAudiences = [
    "All Users",
    "Premium Users",
    "Suspended Users",
    "Advance Users",
    "Specific Users",
    "Active Users",
];

export const emailValidationSchema = (action) => {
    return Yup.object({
        subject: Yup.string().required("Subject is required"),
        body: Yup.string().required("Email body is required"),
        audience: Yup.string()
            .oneOf(allowedAudiences, "Invalid audience selected")
            .required("Audience is required"),

        actionLink: Yup.string().when([], {
            is: () => action === true,
            then: (schema) =>
                schema
                    .required("Action link is required")
                    .url("Enter a valid URL"),
            otherwise: (schema) => schema.notRequired(),
        }),

        actionText: Yup.string().when([], {
            is: () => action === true,
            then: (schema) => schema.required("Action text is required"),
            otherwise: (schema) => schema.notRequired(),
        }),
    });
};
