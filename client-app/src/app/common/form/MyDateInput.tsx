import "react";
import {Form} from "semantic-ui-react";
import DatePicker from "react-datepicker";
// import { ReactDatePickerProps } from "react-datepicker";

import {useState} from "react";

interface Props {
	placeholderText?: string | undefined;
	name?: string | undefined;
	timeFormat?: string | undefined;
	timeCaption?: string | undefined;
	dateFormat?: string | undefined;

}

export default function MyDateInput({placeholderText, name, timeFormat, timeCaption, dateFormat}: Props) {
	const [startDate, setStartDate] = useState(new Date());

	// @ts-ignore
	// @ts-nocheck
	return (
		<Form.Field>
			<DatePicker
				name={name}
				placeholderText={placeholderText}
				selected={startDate}
				onChange={(date) => setStartDate(date!)}
				showTimeSelect
				timeFormat={timeFormat}
				timeCaption={timeCaption}
				dateFormat={dateFormat}
			/>
		</Form.Field>
	)
}