// Configuration using environment variables
const config = {
  admin: {
    username: process.env.NEXT_PUBLIC_ADMIN_USERNAME,
    password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
  },
  tinymce: {
    apiKey: process.env.NEXT_PUBLIC_TINYMCE_API_KEY,
  }
};

export default config; 