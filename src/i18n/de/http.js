export const http = {

  400: 'Ihre Anfrage ist fehlerhaft oder unvollständig.',
  401: 'Unauthorisierter Zugriff! Bitte melden Sie sich erst an, wenn Sie diese Aktion durchführen möchten.',
  403: 'Unautorisierter Zugriff! Für diese Aktion haben Sie nicht die nötige Berechtigung.',
  404: 'Es tut uns leid, aber die von Ihnen gesuchte Ressource konnte nicht gefunden werden.',
  405: 'Unautorisierter Zugriff! Für diese Aktion haben Sie nicht die nötige Berechtigung.',
  429: 'Zu viele Versuche. Sie können im Moment nicht auf diese Ressource zugreifen. Bitte versuche es später noch mal.',

  500: 'Es tut uns leid, es ist ein Fehler aufgetreten. Bitte versuche es später erneut.',
  502: 'Es tut uns leid, es gab ein Problem beim Verarbeiten Ihrer Anfrage. Der Server hat eine ungültige Antwort erhalten, daher konnte das Formular nicht gesendet werden.',
  503: 'Diese Aktion ist momentan nicht verfügbar, da wir Wartungsarbeiten durchführen. Wir sind in Kürze wieder für Sie erreichbar.',
  504: 'Server Timeout. Es scheint, dass die Verbindung zum Server zu lange dauert. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut. Sollte das Problem weiterhin bestehen, wenden Sie sich an den Support.',

  success: {
    account: {
      register_email_verify: 'Bitte überprüfen Sie Ihre E-Mail und folgen Sie den Anweisungen, um Ihre E-Mail-Adresse zu verifizieren. Wenn Sie weitere Fragen haben, stehen wir Ihnen gerne zur Verfügung.',
      verified: 'Herzlichen Glückwunsch! Sie haben Ihren Account erfolgreich verifiziert.',
      login: 'Anmeldung Erfolgreich',
      logout: 'Sie haben sich erfolgreich abgemeldet!',
      token: 'Bitte überprüfen Sie Ihre E-Mails und tragen Sie den entsprechenden PIN-Code ein, um die Aktion erfolgreich abzuschließen.',
    },

    created: {
      contact: 'Ihre Nachricht wurde erfolgreich gesendet.',
      address: 'Sie haben erfolgreich eine neue Adresse hinzugefügt.',
      category: 'Kategorie erfolgreich erstellt.',
      product: 'Produkt erfolgreich erstellt.',
    },

    updated: {
      settings: 'Ihre Einstellungen wurden erfolgreich Aktualisiert.',
      user_data: 'Sie haben Ihre Nutzerdaten erfolgreich geändert.',
      email: 'Sie haben Ihre E-Mail Adresse erfolgreich aktualisiert. Bitte melden Sie sich erneut an.',
      password: 'Sie haben Ihr Passwort erfolgreich aktualisiert. Bitte melden Sie sich erneut an.',
      address: 'Ihre Adressdaten wurden erfolgreich geändert.',
      category: 'Kategorie update erfolgreich.',
      product: 'Produkt update erfolgreich.',
    },

    deleted: {
      account: 'Sie haben Ihr Konto erfolgreich gelöscht.',
      address: 'Ihre Adressdaten wurden erfolgreich gelöscht.',
      category: 'Kategorie erfolgreich gelöscht.',
      product: 'Produkt erfolgreich gelöscht.',
    },
  },
  error: {
    "email_not_match_db_email": 'Die eingegebene E-Mail-Adresse stimmt nicht mit der im System gespeicherten überein.',
    "email_match_old_new": 'Ihre neue E-Mail Adresse darf nicht mit der alten E-Mail Adresse übereinstimmen. Bitte vergeben Sie eine neue E-Mail Adresse.',
    "email_not_verified": 'Unerlaubter Zugriff! Bitte verifizieren Sie erst Ihre E-Mail-Adresse, bevor Sie diese Aktion durchführen können.',
    "email_doesnt_exists": 'Diese E-Mail-Adresse ist nicht in unserem System hinterlegt. Sollten Ihre Kontodaten verloren gegangen sein, wenden Sie sich bitte an unseren Kundenservice.',
    "email_user_exists": 'Diese E-Mail-Adresse ist bereits in unserem System hinterlegt. Sollte dieses Konto nicht Ihnen gehören, wenden Sie sich bitte an unseren Kundenservice.',

    "password_not_match_db_pwd": 'Leider stimmen das von Ihnen eingegebene Passwort und das hinterlegte Passwort nicht überein. Bitte überprüfen Sie Ihre Eingaben oder setzen Sie Ihr Passwort zurück.',
    "password_match_old_new": 'Ihr neues Passwort darf nicht mit dem alten Passwort übereinstimmen. Bitte vergeben Sie ein neues Passwort.',

    "token_not_match": 'Ihr PIN-Code stimmt nicht überein. Bitte überprüfen Sie Ihre Eingaben.',
    "token_timeout": 'Leider ist Ihr Verifizierungstoken abgelaufen. Bitte starten Sie den Prozess erneut.',

    "url_link_not_match": 'Dieser Link ist nicht korrekt. Bitte versuchen Sie es noch einmal oder klicken Sie auf den Link in der E-Mail.',

    "account_doesnt_exists": 'Es konnte kein Account mit den angegebenen Zugangsdaten gefunden werden.',
    "account_doesnt_exists_verify": 'In unserem System gibt es kein Konto, das Sie verifizieren können.',

    "csrf_missmatch": 'Es ist ein Fehler aufgetreten. Ihr Authentifizierungstoken ist nicht vorhanden.',
  },
};
