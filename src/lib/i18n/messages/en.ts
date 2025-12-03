import auth from "./en/auth.json";
import common from "./en/common.json";
import errors from "./en/errors.json";
import messages from "./en/messages.json";
import validation from "./en/validation.json";
import dataTable from "./en/components/dataTable.json";
import dashboard from "./en/pages/dashboard.json";
import layout from "./en/pages/layout.json";
import permitRequests from "./en/pages/permitRequests.json";

const en = {
  auth,
  common,
  errors,
  messages,
  validation,
  components: {
    dataTable,
  },
  pages: {
    dashboard,
    layout,
    permitRequests,
  },
};

export default en;
