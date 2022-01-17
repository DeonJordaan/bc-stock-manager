import { ref, onValue } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import database from './firebase.js';

const EmailContext = React.createContext({
	emails: [],
});

export const EmailContextProvider = (props) => {
	const [emails, setEmails] = useState([]);

	// Extract emails from database on render
	useEffect(() => {
		onValue(ref(database), (snapshot) => {
			setEmails([]);
			const dbEmails = snapshot.val();

			const loadedEmails = [];

			// Push emails to array
			if (dbEmails.emailList) {
				dbEmails.emailList?.map((item) => {
					loadedEmails.push(item);
					return loadedEmails;
				});
			}

			// Set emails array to state
			setEmails(loadedEmails);
		});
	}, []);

	return (
		<EmailContext.Provider
			value={{
				emails: emails,
			}}
		>
			{props.children}
		</EmailContext.Provider>
	);
};

export default EmailContext;
