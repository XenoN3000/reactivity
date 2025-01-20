import "react";
import {Form} from "semantic-ui-react";
import DatePicker from "react-datepicker";

import {useState} from "react";

interface Props {
	placeholder: string;
	name?: string;
	label?: string;
}

export default function MyDateInput({placeholder, name, label}: Props) {

	const [startDate, setStartDate] = useState(new Date());

	return (
		<Form.Field label={label}>
			<DatePicker
				placeholderText={placeholder}
				name={name}
				selected={startDate}
				onChange={(date) => setStartDate(date!)}/>

		</Form.Field>
	)
}