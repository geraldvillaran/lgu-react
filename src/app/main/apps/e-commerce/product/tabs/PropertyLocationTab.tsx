import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * The pricing tab.
 */
function PropertyLocationTab() {
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
						label="Province/ City"
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
						label="Municipality"
						id="priceTaxIncl"
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
						label="Brgy/ District"
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
						label="No./ Street"
						id="comparedPrice"
						variant="outlined"
						fullWidth
					/>
				)}
			/>
		</div>
	);
}

export default PropertyLocationTab;
