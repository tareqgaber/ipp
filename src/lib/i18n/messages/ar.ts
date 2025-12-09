import auth from "./ar/auth.json";
import common from "./ar/common.json";
import errors from "./ar/errors.json";
import messages from "./ar/messages.json";
import validation from "./ar/validation.json";
import dashboard from "./ar/pages/dashboard.json";
import layout from "./ar/pages/layout.json";
import permitRequests from "./ar/pages/permitRequests.json";

const ar = {
  auth,
  common,
  errors,
  messages,
  validation,
  pages: {
    dashboard,
    layout,
    permitRequests,
  },
};

export default ar;
