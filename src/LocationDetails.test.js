import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import LocationDetails from './LocationDetails';
import { apiEndpoints } from './api_endpoints';

// Create a mock instance of axios
const mock = new MockAdapter(axios);

const renderWithRouter = (component, route = '/') => {
    window.history.pushState({}, 'Test Page', route);
    return render(
        <Router>
            {component}
        </Router>
    );
};

describe('LocationDetails Component', () => {
    afterEach(() => {
        mock.reset();
    });

    test('displays loading spinner while data is being fetched', () => {
        renderWithRouter(<LocationDetails />, '/company/1/location/1');
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    test('displays error message when there is an error fetching data', async () => {
        mock.onGet(`${apiEndpoints.baseURL}companies/1/locations/1`).reply(500);

        renderWithRouter(<LocationDetails />, '/company/1/location/1');

        await waitFor(() => {
            expect(screen.getByText(/There was an error fetching the location details!/i)).toBeInTheDocument();
        });
    });

    test('displays no location data available message when no data is returned', async () => {
        mock.onGet(`${apiEndpoints.baseURL}companies/1/locations/1`).reply(200, []);

        renderWithRouter(<LocationDetails />, '/company/1/location/1');

        await waitFor(() => {
            expect(screen.getByText(/No location data available./i)).toBeInTheDocument();
        });
    });

    test('displays location details correctly when data is fetched successfully', async () => {
        const mockData = [
            {
                location_id: '1',
                name: 'Test Location',
                address: '123 Test St',
                latitude: 37.7749,
                longitude: -122.4194
            }
        ];
        mock.onGet(`${apiEndpoints.baseURL}companies/1/locations/1`).reply(200, mockData);

        renderWithRouter(<LocationDetails />, '/company/1/location/1');

        await waitFor(() => {
            expect(screen.getByText(/Test Location/i)).toBeInTheDocument();
            expect(screen.getByText(/123 Test St/i)).toBeInTheDocument();
            expect(screen.getByText(/Latitude: 37.7749/i)).toBeInTheDocument();
            expect(screen.getByText(/Longitude: -122.4194/i)).toBeInTheDocument();
        });
    });
});
