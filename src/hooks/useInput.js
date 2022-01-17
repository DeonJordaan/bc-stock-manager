import { useState } from 'react';

const useInput = (validateValue) => {
	// Save entered value to state
	const [enteredValue, setEnteredValue] = useState('');
	// Has the input been touched by the user
	const [isTouched, setIsTouched] = useState(false);

	const valueIsValid = validateValue(enteredValue);
	const hasError = !valueIsValid && isTouched;

	// Gather entered input value
	const valueChangeHandler = (event) => {
		setEnteredValue(event.target.value);
	};

	// onBlur event sets isTouched state
	const inputBlurHandler = (event) => {
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
