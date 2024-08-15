import { useTranslation } from 'react-i18next';

const ClientErrorManager = (clientError) => {
  const { t } = useTranslation();

  return {
    getErrorMsg: (name) => {
      const error = clientError[name];

      if (error) {
        const { msg } = error;

        if (msg.length === 2 && typeof msg[1] === 'number') {
          return t(msg[0], { chars: msg[1] });
        }

        return t(msg[0]) || '';
      }

      return '';
    },
  };
};

export default ClientErrorManager;
