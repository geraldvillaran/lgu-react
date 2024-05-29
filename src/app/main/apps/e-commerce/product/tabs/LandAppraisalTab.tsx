import React, { useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography, IconButton, Divider } from '@mui/material';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';
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

function LandAppraisalTab() {
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
        <Box>
            <Typography variant="h6" gutterBottom mb={3}>
                Land Appraisal
            </Typography>
            {fields.map((field, index) => (
                <Box key={field.id} sx={{ position: 'relative', marginBottom: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Controller
                                name={`owners.${index}.name`}
                                control={control}
                                defaultValue={field.name}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Classification"
                                        required
                                    />
                                )}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={3}>
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
                                                label="Sub-classification"
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
                        <Grid item xs={2}>
                            <Controller
                                name={`owners.${index}.name`}
                                control={control}
                                defaultValue={field.name}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Area (Sqm)"
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Controller
                                name={`owners.${index}.name`}
                                control={control}
                                defaultValue={field.name}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Unit Value"
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Controller
                                name={`owners.${index}.name`}
                                control={control}
                                defaultValue={field.name}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Base Market Value"
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <IconButton
                                onClick={() => remove(index)}
                                size="small"
                                sx={{
                                    color: 'inherit',
                                    '&:hover': {
                                        backgroundColor: 'red',
                                        color: 'white',
                                    },
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Divider light sx={{ marginTop: 2 }} />
                </Box>
            ))}
            <Box sx={{ position: 'relative', marginBottom: 2 }}>
                <Grid  container spacing={2}>
                    <Grid item xs={2}>
                        <Button variant="contained" onClick={addOwner}>
                            Add Classification
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                    <Box sx={{ typography: 'body2', textAlign: 'end'}}>Total Area:</Box>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Total Area"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Box display="flex" justifyContent="center"  alignItems="center" sx={{ typography: 'body2'}}>Total:</Box>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Base Market Value"
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default LandAppraisalTab;
