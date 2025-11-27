import auth from './ar/auth.json';
import common from './ar/common.json';
import errors from './ar/errors.json';
import messages from './ar/messages.json';
import sidebar from './ar/sidebar.json';
import validation from './ar/validation.json';
import dashboard from './ar/pages/dashboard.json';
import opportunities from './ar/pages/opportunities.json';
import opportunityDetails from './ar/pages/opportunityDetails.json';
import opportunityForm from './ar/pages/opportunityForm.json';

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
