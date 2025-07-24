import * as Yup from "yup";


const allowedAudiences = [
    "All Users",
    "Premium Users",
    "Inactive Users (30 days)"
];
export const emailValidationSchema = Yup.object({
    subject: Yup.string().required("Subject is required"),
    body: Yup.string().required("Email body is required"),
    audience: Yup.string()
        .oneOf(allowedAudiences, "Invalid audience selected")
        .required("Audience is required"),
    scheduledAt: Yup.string().when("scheduleNow", {
        is: false,
        then: Yup.string().required("Scheduled date & time is required"),
    }),
});