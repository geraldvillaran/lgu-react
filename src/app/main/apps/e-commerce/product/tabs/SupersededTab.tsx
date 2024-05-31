import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * The pricing tab.
 */
function SupersededTab() {
	const methods = useFormContext();
	const { control } = methods;

	return (
		<div>
			<Controller
				name="priceTaxExcl"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						label="PIN"
						id="priceTaxExcl"
						type="number"
						variant="outlined"
						autoFocus
						fullWidth
					/>
				)}
			/>

			<Controller
				name="priceTaxIncl"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						label="ARP No."
						id="priceTaxIncl"
						type="number"
						variant="outlined"
						fullWidth
					/>
				)}
			/>

			<Controller
				name="taxRate"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						label="TD No."
						id="taxRate"
						type="number"
						variant="outlined"
						fullWidth
					/>
				)}
			/>

			<Controller
				name="comparedPrice"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						label="Total Assessed Value"
						id="comparedPrice"
						InputProps={{
							startAdornment: <InputAdornment position="start">₱</InputAdornment>
						}}
						type="number"
						variant="outlined"
						fullWidth
						helperText="Add a compare price to show next to the real price"
					/>
				)}
			/>

            <Controller
				name="taxRate"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						label="Previous Owner"
						id="taxRate"
						type="number"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
            <Controller
				name="taxRate"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						label="Effectivity of Assignment"
						id="taxRate"
						type="number"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
            <Controller
				name="taxRate"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						label="ARP Page No."
						id="taxRate"
						type="number"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
            <Controller
				name="taxRate"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						label="Date"
						id="taxRate"
						type="number"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
		</div>
	);
}

export default SupersededTab;
