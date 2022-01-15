import { ref, onValue } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import database from './firebase.js';

const EmailContext = React.createContext({
	emails: [],
	// setEmails: () => {},
});

export const EmailContextProvider = (props) => {
	const [emails, setEmails] = useState([]);

	useEffect(() => {
		onValue(ref(database), (snapshot) => {
			setEmails([]);
			const dbEmails = snapshot.val();

			const loadedEmails = [];

			if (dbEmails) {
				dbEmails.emails?.map((item) => {
					loadedEmails.push(item);
					return loadedEmails;
				});
			}

			setEmails(loadedEmails);
		});
	}, []);

	// useEffect(() => {
	// 	update(ref(database, '/emails'), {
	// 		emails,
	// 	});
	// }, [emails]);

	return (
		<EmailContext.Provider
			value={{
				emails: emails,
				// setEmails: setEmails,
			}}
		>
			{props.children}
		</EmailContext.Provider>
	);
};

export default EmailContext;
