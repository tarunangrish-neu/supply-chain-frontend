import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Button, Typography, List, Card, CardContent, Container, CircularProgress } from '@mui/material';
import LocationDetails from './LocationDetails';
import { motion } from 'framer-motion';
import { apiEndpoints, axiosConfig } from './api_endpoints';

function CompanyDetails({ companyName }) {
    const { companyId } = useParams();
    const [companyDetails, setCompanyDetails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            console.log(`Fetching details for company ID: ${companyId}`);
            try {
                const response = await axios.get(apiEndpoints.baseURL + `companies/${companyId}`, axiosConfig);
                console.log('Company details:', response.data);
                setCompanyDetails(response.data);
            } catch (error) {
                console.error("There was an error fetching the company details!", error);
            }
        };

        fetchCompanyDetails();
    }, [companyId]);

    if (!companyDetails || companyDetails.length === 0) {
        return (
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container>
            <Button
    variant="outlined"
    size="large"
    onClick={() => navigate("/companies")}
    sx={{
        marginBottom: 2,
        marginTop: 4,
        backgroundColor: '#066ebe',
        color: 'white',
        borderColor: '#066ebe',
        '&:hover': {
            backgroundColor: 'white',
            color: '#066ebe',
            borderColor: 'black',
        },
    }}
>
    Company List
</Button>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                {companyName}
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{fontWeight: 'bold'}}>
                Locations
            </Typography>
            <List>
                {companyDetails.map(location => (
                    <motion.div
                        key={location.location_id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card
                            sx={{
                                marginBottom: 2,
                                boxShadow: 3,
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                },
                            }}
                        >
                            <CardContent>
                                <Link
                                    to={`/companies/${location.company_id}/locations/${location.location_id}`}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <Typography variant="h6" component="h3">
                                        {location.name}
                                    </Typography>
                                </Link>
                                <Typography variant="body1" gutterBottom>
                                    {location.address}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Latitude: {location.latitude}, Longitude: {location.longitude}
                                </Typography>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </List>
            <Routes>
                <Route path="locations/:locationId" element={<LocationDetails />} />
            </Routes>
        </Container>
    );
}

export default CompanyDetails;
