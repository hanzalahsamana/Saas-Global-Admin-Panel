import * as Yup from "yup";

export const emailValidationSchema = Yup.object({
    subject: Yup.string().required("Subject is required"),
    body: Yup.string().required("Email body is required"),
    audience: Yup.string().required("Audience is required"),
    scheduledAt: Yup.string().when("scheduleNow", {
        is: false,
        then: Yup.string().required("Scheduled date & time is required"),
    }),
});