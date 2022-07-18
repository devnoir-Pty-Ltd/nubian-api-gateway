import { ApolloError } from 'apollo-server-errors';
import { log } from '@root/utils';

const gqlFormatErrors = (error: ApolloError | any) => {
	log.error('[gqlFormatErrors]', error);
	const errorDetails = error.originalError?.response?.body;

	try {
		if (errorDetails) return JSON.parse(errorDetails);
	} catch (e) {
		log.error('[gqlFormatErrors] json parse', error);
	}

	if (error.message) return error.message;

	return null;
};

export default gqlFormatErrors;
