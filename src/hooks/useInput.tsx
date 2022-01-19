import { useState } from 'react';

const useInput = (validateValue: (value: string) => boolean) => {
	// Save entered value to state
	const [enteredValue, setEnteredValue] = useState<string>();
	// Has the input been touched by the user
	const [isTouched, setIsTouched] = useState<boolean>(false);

	let valueIsValid: boolean;
	let hasError: boolean;

	if (enteredValue) {
		valueIsValid = validateValue(enteredValue);
		hasError = !valueIsValid && isTouched;
	}

	// Gather entered input value
	const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		// const valueChangeHandler = (event: {
		// 	target: { value: SetStateAction<string | undefined> };
		// }) => {
		setEnteredValue(event.target.value);
	};

	// onBlur event sets isTouched state
	const inputBlurHandler = () => {
		setIsTouched(true);
	};

	// Reset input and isTouched state
	const reset = () => {
		setEnteredValue('');
		setIsTouched(false);
	};

	return {
		value: enteredValue,
		hasError,
		isValid: valueIsValid,
		valueChangeHandler,
		inputBlurHandler,
		reset,
	};
};

export default useInput;
