import { ref, onValue } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import database from './firebase.jsx';

type EmailContextObject = {
	emails: string[];
};
const EmailContext = React.createContext<EmailContextObject>({
	emails: [],
});

export const EmailContextProvider: React.FC = (props) => {
	const [emails, setEmails] = useState<string[]>([]);

	// Extract emails from database on render
	useEffect(() => {
		onValue(ref(database), (snapshot) => {
			setEmails([]);
			const dbEmails = snapshot.val();

			const loadedEmails: string[] = [];

			// Push emails to array
			if (dbEmails.emailList) {
				dbEmails.emailList?.map((item: string) => {
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
