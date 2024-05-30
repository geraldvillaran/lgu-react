import React, { useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography, IconButton, Divider } from '@mui/material';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';

// Define the form values type
interface FormValues {
    improvements: Array<{
        id: string;
        kind: string;
        total_number: string;
        unit_value: string;
        base_market_value: string;
        improvement_select?: {
            kind: string;
            unit_value: string;
        };
    }>;
}

// Static list of options for the Autocomplete
const improvementOptions = [
    { kind: 'Fence', unit_value: '50' },
    { kind: 'Shed', unit_value: '200' },
    { kind: 'Sidewalk', unit_value: '100' },
    { kind: 'Pool', unit_value: '500' },
    { kind: 'Gazebo', unit_value: '300' }
];

function PropertyAssessmentTab() {
    const { control, register, setValue, watch } = useFormContext<FormValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'improvements',
    });

    const improvements = watch('improvements') || [];

    const calculateTotalNumber = () => {
        return improvements.reduce((total, item) => total + (parseFloat(item.total_number) || 0), 0);
    };

    const calculateTotalBaseMarketValue = () => {
        return improvements.reduce((total, item) => total + (parseFloat(item.base_market_value) || 0), 0);
    };

    useEffect(() => {
        register('improvements');
    }, [register]);

    const addImprovement = () => {
        append({ id: uuidv4(), kind: '', total_number: '', unit_value: '', base_market_value: '', improvement_select: { kind: '', unit_value: '' } });
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom mb={3}>
                Property Assessment
            </Typography>
            {fields.map((field, index) => (
                <Box key={field.id} sx={{ position: 'relative', marginBottom: 2 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={5}>
                            <Controller
                                name={`improvements.${index}.improvement_select`}
                                control={control}
                                defaultValue={field.improvement_select || { kind: '', unit_value: '' }}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        value={improvementOptions.find(option => option.kind === field.value.kind) || null}
                                        onChange={(event, value) => {
                                            field.onChange(value || { kind: '', unit_value: '' });
                                            if (value) {
                                                setValue(`improvements.${index}.kind`, value.kind);
                                                setValue(`improvements.${index}.unit_value`, value.unit_value);
                                                const totalNumber = parseFloat(watch(`improvements.${index}.total_number`) || '0');
                                                const baseMarketValue = totalNumber * parseFloat(value.unit_value);
                                                setValue(`improvements.${index}.base_market_value`, baseMarketValue.toFixed(2));
                                            }
                                        }}
                                        options={improvementOptions}
                                        getOptionLabel={(option) => option.kind}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Actual Use"
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
                                name={`improvements.${index}.total_number`}
                                control={control}
                                defaultValue={field.total_number}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Market Value"
                                        required
                                        onChange={(event) => {
                                            field.onChange(event);
                                            const unitValue = parseFloat(watch(`improvements.${index}.unit_value`) || '0');
                                            const totalNumber = parseFloat(event.target.value || '0');
                                            const baseMarketValue = unitValue * totalNumber;
                                            setValue(`improvements.${index}.base_market_value`, baseMarketValue.toFixed(2));
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Controller
                                name={`improvements.${index}.unit_value`}
                                control={control}
                                defaultValue={field.unit_value}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Assessment Level"
                                        required
                                        variant="filled"
                            color="success"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Controller
                                name={`improvements.${index}.base_market_value`}
                                control={control}
                                defaultValue={field.base_market_value}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Assessed Value"
                                        required
                                        variant="filled"
                                        color="success"
                                        InputProps={{
                                            readOnly: true,
                                        }}
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
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Button variant="contained" color="success" onClick={addImprovement}>
                            <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
                            Add Actual Use
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{ typography: 'body2', textAlign: 'end' }}>Total Number:</Box>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Total Number"
                            value={calculateTotalNumber().toFixed(2)}
                            variant="filled"
                            color="success"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ typography: 'body2', textAlign: 'end' }}>Total Base Market Value:</Box>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Total Base Market Value"
                            value={calculateTotalBaseMarketValue().toFixed(2)}
                            variant="filled"
                            color="success"
                            InputProps={{
                                readOnly: true,
                                sx: { fontWeight: 'bold', color: 'green' }
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default PropertyAssessmentTab;
