import React from 'react';
/* global describe, it, expect */

import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import store from '../redux/Store';

import { BrowserRouter } from 'react-router-dom';

import FetchJob from '../components/FetchJob.jsx';
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

MyFallbackComponent.propTypes = {
  error: PropTypes.object.isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};

describe('Tests FetchJob component', () => {
  it('Should render FetchJob component', () => {
    const tree = renderer
      .create(
        <ErrorBoundary FallbackComponent={MyFallbackComponent}>
          <Provider store={store}>
            <BrowserRouter>
              <FetchJob />
            </BrowserRouter>
          </Provider>
        </ErrorBoundary>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
