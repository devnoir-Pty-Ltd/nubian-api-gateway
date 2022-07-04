import { ApolloError } from 'apollo-server-errors';

const gqlFormatErrors = (error: ApolloError | any) => {
	console.log('this is is the error', error);
	const errorDetails = error.originalError?.response?.body;

	try {
		if (errorDetails) return JSON.parse(errorDetails);
	} catch (e) {
		console.log('there is an error somewhere', e.message);
	}

	if (error.message) return error.message;

	return null;
};

export default gqlFormatErrors;
