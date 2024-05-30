import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import { EcommerceProduct } from '../../ECommerceApi';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';

interface CountryType {
	code: string;
	label: string;
	phone: string;
	suggested?: boolean;
  }

  const countries: readonly CountryType[] = [
	{ code: 'AD', label: 'Andorra', phone: '376' },
	{
	  code: 'AE',
	  label: 'United Arab Emirates',
	  phone: '971',
	},
	{ code: 'AF', label: 'Afghanistan', phone: '93' },
	{
	  code: 'AG',
	  label: 'Antigua and Barbuda',
	  phone: '1-268',
	},
	{ code: 'AI', label: 'Anguilla', phone: '1-264' },
];

function BirthdayIcon() {
	return <FuseSvgIcon size={20}>heroicons-solid:cake</FuseSvgIcon>;
}
/**
 * The basic info tab.
 */
function BasicInfoTab() {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	return (
		<div>
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Transaction Title"
						autoFocus
						id="name"
						variant="outlined"
						fullWidth
						error={!!errors.name}
						helperText={errors?.name?.message as string}
					/>
				)}
			/>
			<Autocomplete
				id="country-select-demo"
				sx={{ width: 300, marginBottom: 2 }}
				options={countries}
				autoHighlight
				getOptionLabel={(option) => option.label}
				renderOption={(props, option) => (
				<Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
					<img
						loading="lazy"
						width="20"
						srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
						src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
						alt=""
					/>
					{option.label} ({option.code}) +{option.phone}
					</Box>
				)}
				renderInput={(params) => (
					<TextField
					{...params}
					label="Transaction Code"
					inputProps={{
						...params.inputProps,
						autoComplete: 'new-password', // disable autocomplete and autofill
					}}
					/>
				)}
			/>
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="ARP No."
						autoFocus
						id="name"
						variant="outlined"
						fullWidth
						error={!!errors.name}
						helperText={errors?.name?.message as string}
					/>
				)}
			/>
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="PIN"
						autoFocus
						id="name"
						variant="outlined"
						fullWidth
						error={!!errors.name}
						helperText={errors?.name?.message as string}
					/>
				)}
			/>
			<Controller
				control={control}
				name="birthday"
				render={({ field: { value, onChange } }) => (
					<DatePicker
						value={new Date(value)}
						onChange={(val) => {
							onChange(val?.toString());
						}}
						className="mt-32 mb-16 w-full"
						slotProps={{
							textField: {
								id: 'birthday',
								label: 'Dated',
								InputLabelProps: {
									shrink: true
								},
								fullWidth: true,
								variant: 'outlined',
								// error: !!errors.birthday,
								// helperText: errors?.birthday?.message
							},
							actionBar: {
								actions: ['clear', 'today']
							}
						}}
						slots={{
							openPickerIcon: BirthdayIcon
						}}
					/>
				)}
			/>
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Survey No."
						autoFocus
						id="name"
						variant="outlined"
						fullWidth
						error={!!errors.name}
						helperText={errors?.name?.message as string}
					/>
				)}
			/>
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Lot No."
						autoFocus
						id="name"
						variant="outlined"
						fullWidth
						error={!!errors.name}
						helperText={errors?.name?.message as string}
					/>
				)}
			/>
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						required
						label="Blk:"
						autoFocus
						id="name"
						variant="outlined"
						fullWidth
						error={!!errors.name}
						helperText={errors?.name?.message as string}
					/>
				)}
			/>
			{/* <Controller
				name="description"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						id="description"
						label="Description"
						type="text"
						multiline
						rows={5}
						variant="outlined"
						fullWidth
					/>
				)}
			/>

			<Controller
				name="categories"
				control={control}
				defaultValue={[]}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						multiple
						freeSolo
						options={[]}
						value={value as EcommerceProduct['categories']}
						onChange={(event, newValue) => {
							onChange(newValue);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select multiple categories"
								label="Categories"
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="tags"
				control={control}
				defaultValue={[]}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						className="mt-8 mb-16"
						multiple
						freeSolo
						options={[]}
						value={value as EcommerceProduct['tags']}
						onChange={(event, newValue) => {
							onChange(newValue);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Select multiple tags"
								label="Tags"
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
						)}
					/>
				)}
			/> */}
		</div>
	);
}

export default BasicInfoTab;
