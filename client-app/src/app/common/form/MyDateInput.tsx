import "react";
import {Form, Label} from "semantic-ui-react";
import DatePicker from "react-datepicker";
// import { ReactDatePickerProps } from "react-datepicker";
import {useField} from "formik";

interface Props {
	placeholderText?: string | undefined;
	name?: string | undefined;
	timeFormat?: string | undefined;
	timeCaption?: string | undefined;
	dateFormat?: string | undefined;

}

export default function MyDateInput(props: Props) {
	// const [startDate, setStartDate] = useState(new Date());
	// @ts-ignore
	const [field, meta, helpers] = useField(props.name)

	// @ts-ignore
	// @ts-nocheck
	return (
		<Form.Field>
			<DatePicker

				{...field}
				{...props}

				name={props.name}
				placeholderText={props.placeholderText}
				selected={field.value && new Date(field.value) || null}
				onChange={(value) => helpers.setValue(value)}
				showTimeSelect
				timeFormat={props.timeFormat}
				timeCaption={props.timeCaption}
				dateFormat={props.dateFormat}
			/>

			{meta.touched && meta.error ? (
				<Label basic color="red">
					{meta.error}
				</Label>
			) : null}

		</Form.Field>
	)
}