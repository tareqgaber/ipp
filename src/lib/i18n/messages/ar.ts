import auth from "./ar/auth.json";
import common from "./ar/common.json";
import errors from "./ar/errors.json";
import messages from "./ar/messages.json";
import validation from "./ar/validation.json";
import dashboard from "./ar/pages/dashboard.json";

export default {
  auth,
  common,
  errors,
  messages,
  validation,
  pages: {
    dashboard,
    auth,
  },
} as const;
