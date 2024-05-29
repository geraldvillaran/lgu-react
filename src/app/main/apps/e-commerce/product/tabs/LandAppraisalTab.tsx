import React, { useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography, IconButton, Divider } from '@mui/material';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';
import { Classification } from '../../ECommerceApi'; // Assuming Classification type is exported from ECommerceApi

// Define a type that extends Classification with the classification_select field
interface ClassificationWithSelect extends Classification {
    classification_select?: {
        classification: string;
        sub_classification: string;
        adjustment_value: string;
    };
}

// Define the form values type
interface FormValues {
    classifications: ClassificationWithSelect[];
}

// Static list of options for the Autocomplete
const classificationOptions = [
    { classification: 'Residential', sub_classification: 'Single Detached', adjustment_value: '0.05' },
    { classification: 'Residential', sub_classification: 'Duplex', adjustment_value: '0.10' },
    { classification: 'Residential', sub_classification: 'Apartments or Row Houses', adjustment_value: '0.10' },
    { classification: 'Residential', sub_classification: 'Town Houses', adjustment_value: '0.10' },
    { classification: 'Residential', sub_classification: 'Condominiums', adjustment_value: '0.10' },
    { classification: 'Commercial', sub_classification: 'Office', adjustment_value: '0.15' },
    { classification: 'Commercial', sub_classification: 'Bank', adjustment_value: '0.15' },
    { classification: 'Commercial', sub_classification: 'Theater', adjustment_value: '0.15' },
    { classification: 'Commercial', sub_classification: 'Hotel/ Motel', adjustment_value: '0.15' }
];

function LandAppraisalTab() {
    const { control, register, setValue, watch } = useFormContext<FormValues>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'classifications',
    });

    const classifications = watch('classifications') || [];

    const calculateTotalArea = () => {
        return classifications.reduce((total, item) => total + (parseFloat(item.area) || 0), 0);
    };

    const calculateTotalBaseMarketValue = () => {
        return classifications.reduce((total, item) => total + (parseFloat(item.base_market_value) || 0), 0);
    };

    useEffect(() => {
        register('classifications');
    }, [register]);

    const addClassification = () => {
        append({ id: uuidv4(), classification: '', sub_classification: '', area: '', unit_value: '', base_market_value: '', classification_select: { classification: '', sub_classification: '', adjustment_value: '' } });
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
                                name={`classifications.${index}.classification`}
                                control={control}
                                defaultValue={field.classification}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Classification"
                                        required
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Controller
                                name={`classifications.${index}.classification_select`}
                                control={control}
                                defaultValue={field.classification_select || { classification: '', sub_classification: '', adjustment_value: '' }}
                                render={({ field }) => (
                                    <Autocomplete
                                        {...field}
                                        value={classificationOptions.find(option => option.classification === field.value.classification && option.sub_classification === field.value.sub_classification) || null}
                                        onChange={(event, value) => {
                                            field.onChange(value || { classification: '', sub_classification: '', adjustment_value: '' });
                                            if (value) {
                                                setValue(`classifications.${index}.classification`, value.classification);
                                                setValue(`classifications.${index}.sub_classification`, value.sub_classification);
                                                setValue(`classifications.${index}.unit_value`, value.adjustment_value);
                                                const area = parseFloat(watch(`classifications.${index}.area`) || '0');
                                                const baseMarketValue = area * parseFloat(value.adjustment_value);
                                                setValue(`classifications.${index}.base_market_value`, baseMarketValue.toFixed(2));
                                            }
                                        }}
                                        options={classificationOptions}
                                        getOptionLabel={(option) => `${option.classification} (${option.sub_classification})`}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Classification"
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
                                name={`classifications.${index}.area`}
                                control={control}
                                defaultValue={field.area}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Area (Sqm)"
                                        required
                                        onChange={(event) => {
                                            field.onChange(event);
                                            const unitValue = parseFloat(watch(`classifications.${index}.unit_value`) || '0');
                                            const area = parseFloat(event.target.value || '0');
                                            const baseMarketValue = unitValue * area;
                                            setValue(`classifications.${index}.base_market_value`, baseMarketValue.toFixed(2));
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Controller
                                name={`classifications.${index}.unit_value`}
                                control={control}
                                defaultValue={field.unit_value}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Unit Value"
                                        required
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Controller
                                name={`classifications.${index}.base_market_value`}
                                control={control}
                                defaultValue={field.base_market_value}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Base Market Value"
                                        required
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
                        <Button variant="contained" onClick={addClassification}>
                            Add Classification
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{ typography: 'body2', textAlign: 'end' }}>Total Area:</Box>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Total Area"
                            value={calculateTotalArea().toFixed(2)}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ typography: 'body2' }}>Total:</Box>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Base Market Value"
                            value={calculateTotalBaseMarketValue().toFixed(2)}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default LandAppraisalTab;
