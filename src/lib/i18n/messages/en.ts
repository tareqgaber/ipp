import auth from "./en/auth.json";
import layout from "./en/pages/layout.json";
import common from "./en/common.json";
import errors from "./en/errors.json";
import messages from "./en/messages.json";
import validation from "./en/validation.json";
import dashboard from "./en/pages/dashboard.json";
import permitRequests from "./en/pages/permitRequests.json";

export default {
  auth,
  common,
  errors,
  messages,
  validation,
  pages: {
    dashboard,
    auth,
    permitRequests,
    layout,
  },
} as const;
