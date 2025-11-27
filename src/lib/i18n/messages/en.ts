import auth from './en/auth.json';
import common from './en/common.json';
import errors from './en/errors.json';
import messages from './en/messages.json';
import sidebar from './en/sidebar.json';
import validation from './en/validation.json';
import dashboard from './en/pages/dashboard.json';
import opportunities from './en/pages/opportunities.json';
import opportunityDetails from './en/pages/opportunityDetails.json';
import opportunityForm from './en/pages/opportunityForm.json';

export default {
  auth,
  common,
  errors,
  messages,
  sidebar,
  validation,
  pages: {
    dashboard,
    opportunities,
    opportunityDetails,
    opportunityForm,
  },
} as const;
