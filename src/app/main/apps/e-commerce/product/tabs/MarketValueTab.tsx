import React, { useEffect } from 'react';
import { Box, Grid, TextField, Typography, Divider } from '@mui/material';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';

// Define the form values type
interface FormValues {
    landAppraisals: Array<{
        id: string;
        base_market_value: string;
        adjustment_factors: string;
        percent_adjustment: string;
        value_adjustment: string;
        market_value: string;
    }>;
    otherImprovements: Array<{
        id: string;
        base_market_value: string;
        adjustment_factors: string;
        percent_adjustment: string;
        value_adjustment: string;
        market_value: string;
    }>;
}

function MarketValueTab() {
    const { control, register, setValue, watch } = useFormContext<FormValues>();
    const { fields: landAppraisalFields } = useFieldArray({
        control,
        name: 'landAppraisals',
    });
    const { fields: improvementFields } = useFieldArray({
        control,
        name: 'otherImprovements',
    });

    const landAppraisals = watch('landAppraisals') || [];
    const improvements = watch('otherImprovements') || [];

    useEffect(() => {
        register('landAppraisals');
        register('otherImprovements');
    }, [register]);

    const calculateValueAdjustment = (baseMarketValue: number, percentAdjustment: number) => {
        return (baseMarketValue * (percentAdjustment / 100)).toFixed(2);
    };

    const calculateMarketValue = (baseMarketValue: number, valueAdjustment: number) => {
        return (baseMarketValue - valueAdjustment).toFixed(2);
    };

    const calculateTotal = (items: any[], field: string) => {
        return items.reduce((total, item) => total + (parseFloat(item[field]) || 0), 0).toFixed(2);
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom mb={3}>
                Market Value
            </Typography>
            <Typography variant="caption">
                Land Appraisal
            </Typography>
            {landAppraisalFields.map((field, index) => (
                <Box key={field.id} sx={{ position: 'relative', marginTop: 2 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Controller
                                name={`landAppraisals.${index}.base_market_value`}
                                control={control}
                                defaultValue={field.base_market_value}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Base Market Value"
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
                        <Grid item xs={3}>
                            <Controller
                                name={`landAppraisals.${index}.adjustment_factors`}
                                control={control}
                                defaultValue={field.adjustment_factors}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Adjustment Factors"
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Controller
                                name={`landAppraisals.${index}.percent_adjustment`}
                                control={control}
                                defaultValue={field.percent_adjustment}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="% Adjustment"
                                        type="number"
                                        required
                                        onChange={(event) => {
                                            const percentAdjustment = parseFloat(event.target.value || '0');
                                            const baseMarketValue = parseFloat(watch(`landAppraisals.${index}.base_market_value`) || '0');
                                            const valueAdjustment = parseFloat(calculateValueAdjustment(baseMarketValue, percentAdjustment));
                                            const marketValue = calculateMarketValue(baseMarketValue, valueAdjustment);
                                            setValue(`landAppraisals.${index}.value_adjustment`, valueAdjustment.toString());
                                            setValue(`landAppraisals.${index}.market_value`, marketValue);
                                            field.onChange(event);
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Controller
                                name={`landAppraisals.${index}.value_adjustment`}
                                control={control}
                                defaultValue={field.value_adjustment}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Value Adjustment"
                                        type="number"
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
                                name={`landAppraisals.${index}.market_value`}
                                control={control}
                                defaultValue={field.market_value}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Market Value"
                                        variant="filled"
                                        color="success"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Divider light sx={{ marginTop: 2 }} />
                </Box>
            ))}
            <Typography variant="caption">
                Other Improvements
            </Typography>
            {improvementFields.map((field, index) => (
                <Box key={field.id} sx={{ position: 'relative', marginTop: 2 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Controller
                                name={`otherImprovements.${index}.base_market_value`}
                                control={control}
                                defaultValue={field.base_market_value}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Base Market Value"
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
                        <Grid item xs={3}>
                            <Controller
                                name={`otherImprovements.${index}.adjustment_factors`}
                                control={control}
                                defaultValue={field.adjustment_factors}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Adjustment Factors"
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Controller
                                name={`otherImprovements.${index}.percent_adjustment`}
                                control={control}
                                defaultValue={field.percent_adjustment || '0'}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="% Adjustment"
                                        type="number"
                                        required
                                        onChange={(event) => {
                                            const percentAdjustment = parseFloat(event.target.value || '0');
                                            const baseMarketValue = parseFloat(watch(`otherImprovements.${index}.base_market_value`) || '0');
                                            const valueAdjustment = parseFloat(calculateValueAdjustment(baseMarketValue, percentAdjustment));
                                            const marketValue = calculateMarketValue(baseMarketValue, valueAdjustment);
                                            setValue(`otherImprovements.${index}.value_adjustment`, valueAdjustment.toString());
                                            setValue(`otherImprovements.${index}.market_value`, marketValue);
                                            field.onChange(event);
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Controller
                                name={`otherImprovements.${index}.value_adjustment`}
                                control={control}
                                defaultValue={field.value_adjustment}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Value Adjustment"
                                        type="number"
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
                                name={`otherImprovements.${index}.market_value`}
                                control={control}
                                defaultValue={field.market_value}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Market Value"
                                        variant="filled"
                                        color="success"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Divider light sx={{ marginTop: 2 }} />
                </Box>
            ))}
            <Box sx={{ position: 'relative', marginTop: 2, marginBottom: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{ typography: 'body2', textAlign: 'end' }}>Totals:</Box>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Total % Adjustment"
                            value={calculateTotal([...landAppraisals, ...improvements], 'percent_adjustment')}
                            variant="filled"
                            color="success"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="Total Value Adjustment"
                            value={calculateTotal([...landAppraisals, ...improvements], 'value_adjustment')}
                            variant="filled"
                            color="success"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            label="Total Base Market Value"
                            value={calculateTotal([...landAppraisals, ...improvements], 'base_market_value')}
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

export default MarketValueTab;
