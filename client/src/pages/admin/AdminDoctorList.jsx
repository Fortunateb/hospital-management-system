import React, { useState } from 'react';
import { Container, Grid, InputAdornment,Paper, Toolbar, Typography, Button, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';
import Controls from '../../components/Controls/Controls';
import { Search } from '@material-ui/icons';
import AdminTable from './AdminTable';


import useStyles from './styles';

function createData(name, specialization, email, password, fees) {
    return { name, specialization, email, password, fees};
}

const rows = [
    createData('Dr. Smith', 'General', 'smith@email.com', '123456', '100'),
    createData('Dr. Hueges', 'Cardiologist', 'hueges@email.com', '123456', "200"),
    createData('Dr. Magagula', 'Gynaecolorgist', 'magagula@email.com', '123456', '300'),
    createData('Dr. Nkosi', 'Dermatologist', 'nkosi@email.com', '123456', '350'),
    createData('Dr. Strange', 'Pediatrician', 'strange@email.com', '123456', '400'),
    createData('Dr. Noorbai', 'Neurologist', 'noorbai@email.com', '123456', '500'),
];

const columns = [
    { id: 'name', label: 'Doctor Name', minWidth: 150 },
    { id: 'specialization', label: 'Specialization', minWidth: 170 },
    { id: 'email', label: 'Email Address', minWidth: 170 },
    { id: 'password', label: 'Password', minWidth: 170 },
    { id: 'fees', label: 'Fees', minWidth: 150, align: 'right' }
];


const AdminDoctorList = (props) => {
    const classes = useStyles();

    return (
        <>
            <Container  className={classes.container} sx={{ py: 4 }} maxWidth="m">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography component="h1" variant="h4" color="primary">
                            Doctor List
                        </Typography>
                        <Paper className={classes.paperContent} elevation={5}>
                            <Toolbar>
                                <Controls.Input
                                    label="Search Doctor"
                                    className={classes.searchInput}
                                    InputProps={{
                                        startAdornment: (<InputAdornment position="start">
                                                    <Search />
                                            </InputAdornment>
                                            )
                                        }}
                                        onChange={()=>{}}
                                />
                            </Toolbar>
                            <Paper className={classes.paperContent} elevation={3}>
                                <AdminTable columns={columns} rows={rows}/>
                            </Paper>
                        </Paper>
                    </Grid>

                    {/* <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Paper className={classes.paperContent} elevation={5}>
                            <AdminTable />
                        </Paper>
                    </Grid> */}
                </Grid>
            </Container>
        </>
    )
}

export default AdminDoctorList
