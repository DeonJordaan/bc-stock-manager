import { ref, onValue } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import database from './firebase.js';

const EmailContext = React.createContext({
	emails: [],
});

export const EmailContextProvider = (props) => {
	const [emails, setEmails] = useState([]);

	useEffect(() => {
		onValue(ref(database), (snapshot) => {
			setEmails([]);
			const dbEmails = snapshot.val();

			const loadedEmails = [];

			if (dbEmails.emailList) {
				dbEmails.emailList?.map((item) => {
					loadedEmails.push(item);
					return loadedEmails;
				});
			}

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
