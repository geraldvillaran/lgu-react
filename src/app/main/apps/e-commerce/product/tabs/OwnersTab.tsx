import React, { useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import { Owner } from '../../ECommerceApi'; // Assuming Owner type is exported from ECommerceApi

// Define the form values type
interface FormValues {
    owners: Owner[];
}

function OwnersTab() {
    const { control, register } = useFormContext<FormValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'owners',
    });

    useEffect(() => {
        register('owners');
    }, [register]);

    const addOwner = () => {
        append({ id: uuidv4(), name: '', address: '', contact: '', tin: '' });
    };

    return (
        <Box p={3}>
            <Typography variant="h6" gutterBottom>
                Owners
            </Typography>
            {fields.map((field, index) => (
                <Grid container spacing={2} key={field.id}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name={`owners.${index}.name`}
                            control={control}
                            defaultValue={field.name}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Name"
                                    required
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name={`owners.${index}.address`}
                            control={control}
                            defaultValue={field.address}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Address"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name={`owners.${index}.contact`}
                            control={control}
                            defaultValue={field.contact}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Contact"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name={`owners.${index}.tin`}
                            control={control}
                            defaultValue={field.tin}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="TIN"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={() => remove(index)}>Remove Owner</Button>
                    </Grid>
                </Grid>
            ))}
            <Box mt={2}>
                <Button variant="contained" onClick={addOwner}>
                    Add Owner
                </Button>
            </Box>
        </Box>
    );
}

export default OwnersTab;
