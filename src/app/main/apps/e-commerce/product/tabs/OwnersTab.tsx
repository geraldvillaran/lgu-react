import React, { useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import { v4 as uuidv4 } from 'uuid';
import { Owner } from '../../ECommerceApi'; // Assuming Owner type is exported from ECommerceApi

// Define the form values type
interface FormValues {
    owners: Array<Owner & { owner_select?: { name: string; address: string } }>;
}

// Static list of options for the Autocomplete
const ownerOptions = [
    { name: 'John Doe', address: '123 Main St', contact: '123-456-7890', tin: '123-45-6789' },
    { name: 'Jane Smith', address: '456 Oak Ave', contact: '987-654-3210', tin: '987-65-4321' },
    { name: 'Sam Johnson', address: '789 Pine Rd', contact: '555-555-5555', tin: '555-55-5555' },
    // Add more options as needed
];

function OwnersTab() {
    const { control, register, setValue } = useFormContext<FormValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'owners',
    });

    useEffect(() => {
        register('owners');
    }, [register]);

    const addOwner = () => {
        append({ id: uuidv4(), name: '', address: '', contact: '', tin: '', owner_select: { name: '', address: '' } });
    };

    return (
        <Box p={3}>
            <Typography variant="h6" gutterBottom>
                Owners
            </Typography>
            {fields.map((field, index) => (
                <Grid container spacing={2} key={field.id}>
                    <Grid item xs={12}>
                        <Controller
                            name={`owners.${index}.owner_select`}
                            control={control}
                            defaultValue={field.owner_select || { name: '', address: '' }}
                            render={({ field }) => (
                                <Autocomplete
                                    {...field}
                                    value={ownerOptions.find(option => option.name === field.value.name) || null}
                                    onChange={(event, value) => {
                                        field.onChange(value || { name: '', address: '' });
                                        if (value) {
                                            setValue(`owners.${index}.name`, value.name);
                                            setValue(`owners.${index}.address`, value.address);
                                            setValue(`owners.${index}.contact`, value.contact);
                                            setValue(`owners.${index}.tin`, value.tin);
                                        }
                                    }}
                                    options={ownerOptions}
                                    getOptionLabel={(option) => `${option.name} (${option.address.substring(0, 10)}...)`}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Owner Select"
                                            required
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <React.Fragment>
                                                        {params.InputProps.endAdornment}
                                                    </React.Fragment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name={`owners.${index}.name`}
                            control={control}
                            defaultValue={field.name}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Full Name"
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
