import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import renderer from 'react-test-renderer';

import { BrowserRouter } from 'react-router-dom';

import Navbar from '../components/Navbar.jsx';
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
describe('Tests Navbar component', () => {
  it('Should render Navbar component', () => {
    const tree = renderer
      .create(
        <ErrorBoundary FallbackComponent={MyFallbackComponent}>
          <BrowserRouter>
            <Navbar text="Remote Job Listings" year="2023" />
          </BrowserRouter>
        </ErrorBoundary>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
