export const http = {

  400: 'Your request is incorrect or incomplete.',
  401: 'Unauthorized access! Please log in only if you want to perform this action.',
  403: 'Unauthorized access! You do not have the necessary permissions to perform this action.',
  404: "We’re sorry, but the resource you are looking for could not be found. The form submission failed because the requested page may have been moved or no longer exists.",
  429: 'Too many attempts. Please try again later.',

  500: "We're sorry, an error has occurred. Please try again later.",
  502: "We're sorry, there was a problem processing your request. The server received an invalid response, so the form could not be sent.",
  503: 'This action is currently unavailable due to maintenance. We will be available to you again shortly.',
  504: 'Server timeout. It seems that the connection to the server is taking too long. Please check your internet connection and try again. If the problem persists, contact support.',

  success: {
    account: {
      register_email_verify: 'Please check your email and follow the instructions to verify your email address. If you have any further questions, please do not hesitate to contact us.',
      verified: 'Congratulations! You have successfully verified your account.',
      login: 'Successfully Login',
      logout: 'You have been successfully logged out!',
      token: 'Please check your emails and enter the corresponding PIN code to successfully complete the action.',
    },

    created: {
      contact: 'Your message has been sent successfully.',
      address: 'You have successfully added a new address.',
      category: 'Category created successfully.',
      product: 'Product created successfully.',
    },

    updated: {
      settings: 'Your settings have been updated successfully.',
      user_data: 'You have successfully changed your user data.',
      email: 'You have successfully updated your email address. Please log in again.',
      password: 'You have successfully reset your password. Please log in again.',
      address: 'Your address details have been changed successfully.',
      category: 'Category update successful.',
      product: 'Product update successful',
    },

    deleted: {
      account: 'You have successfully deleted your account.',
      address: 'Your address data has been successfully deleted.',
      category: 'Category successfully deleted.',
      product: 'Product successfully deleted.',
    },
  },
  error: {
    "email_not_match_db_email": 'The email address entered does not match the one stored in the system.',
    "email_match_old_new": 'Your new email address must not be the same as your old email address. Please enter a new email address.',
    "email_not_verified": 'Unauthorized access! Please verify your email address before you can perform this action.',
    "email_doesnt_exists": 'This email address is not stored in our system. If your account details are lost, please contact our customer service.',
    "email_user_exists": 'This email address is already stored in our system. If this account does not belong to you, please contact our customer service.',

    "password_not_match_db_pwd": 'Unfortunately, the password you entered and the password stored on your system do not match. Please check your entries or reset your password.',
    "password_match_old_new": 'Your new password must not be the same as your old password. Please choose a new password.',

    "token_not_match": 'Your PIN code does not match. Please check your entries.',
    "token_timeout": 'Unfortunately, your verification token has expired. Please register again.',

    "url_link_not_match": 'This link is not correct. Please try again or click the link in the email.',

    "account_doesnt_exists": 'No account could be found with the specified login details.',
    "account_doesnt_exists_verify": 'There is no account in our system that you can verify.',
  }
};
