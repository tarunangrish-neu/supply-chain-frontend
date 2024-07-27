import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { InputAdornment, TextField, Table, TableHead, TableBody, TableRow, TableCell, Container, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import { apiEndpoints, axiosConfig } from './api_endpoints';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [filteredCompanies, setFilteredCompanies] = useState([]);

    const fetchCompanyList = async () => {
        try {
            const response = await axios.get(apiEndpoints.baseURL + 'companies', axiosConfig);
            setCompanies(response.data);
            setFilteredCompanies(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("There was an error fetching the companies!", error);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = companies.filter(company => company.name.toLowerCase().includes(query));
        setFilteredCompanies(filtered);
    };

    useEffect(() => {
        fetchCompanyList();
    }, []);

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
                label="Search companies..."
                variant="filled"
                value={searchQuery}
                onChange={handleSearch}
                sx={{ marginBottom: 2, marginTop: 2, backgroundColor: 'white', width: '50%' }}
            />
            <Paper elevation={3} sx={{ width: '50%', margin: 'auto' }}>
                <Table stickyHeader sx={{ minWidth: 300 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                <Typography variant="h5" sx={{fontWeight: 'bold'}}>List of Companies</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody align="center">
                        {filteredCompanies.map((company, index) => (
                            <motion.div
                                key={company.company_id}
                                initial={{ opacity: 0, transform: 'translateY(20px)' }}
                                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <TableRow>
                                    <TableCell align="center">
                                        <Link to={`/companies/${company.company_id}`} onClick={() => setCompanyName(company.name)} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Typography variant="body1" sx={{ '&:hover': { color: 'primary.main', fontWeight: 'bold' } }}>
                                                {company.name} <br />
                                                {company.address}
                                            </Typography>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            </motion.div>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
};

export default CompanyList;
