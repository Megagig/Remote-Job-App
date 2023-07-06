import React from 'react';
/* global describe, it, expect */
import { ErrorBoundary } from 'react-error-boundary';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import store from '../redux/Store';

import { BrowserRouter } from 'react-router-dom';

import FetchJobDetails from '../components/FetchJobDetails.jsx';
function MyFallbackComponent({ error, resetErrorBoundary }) {
  return (
    <div>
      <h2>Something went wrong:</h2>
      <p>{error.message}</p>
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}
describe('Tests FetchJobDetails component', () => {
  it('Should render FetchJobDetails component', () => {
    const tree = renderer
      .create(
        <ErrorBoundary FallbackComponent={MyFallbackComponent}>
          <Provider store={store}>
            <BrowserRouter>
              <FetchJobDetails />
            </BrowserRouter>
          </Provider>
        </ErrorBoundary>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
