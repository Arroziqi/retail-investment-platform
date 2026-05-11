import { initialize, mswLoader } from 'msw-storybook-addon';
import { handlers } from '../src/mocks/handlers';

// Initialize MSW
initialize();

export const mswConfig = {
  loaders: [mswLoader],
  parameters: {
    msw: {
      handlers: handlers,
    },
  },
};
