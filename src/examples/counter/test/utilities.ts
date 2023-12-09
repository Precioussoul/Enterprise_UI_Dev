import { render as renderComponent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

export const render = (ui: React.ReactElement, options: any) => {
  const user = userEvent.setup();
  const result = renderComponent(ui, options);

  return {
    ...result,
    user,
  };
};
