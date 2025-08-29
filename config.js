const isProduction = process.env.NODE_ENV === 'production';

export const Base_URL = isProduction
    ? "https://dev.hannanfabrics.com/api/v1"
    : "http://localhost:1234/api/v1";
