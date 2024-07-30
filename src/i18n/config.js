import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { http as httpDe } from "./de/http.js";
import { http as httpEn } from "./en/http.js";
import { errors as errorsDe } from "./de/errors.js";
import { errors as errorsEn } from "./en/errors.js";
import { input as inputDe } from "./de/input.js";
import { input as inputEn } from "./en/input.js";
import { months as monthsDe } from "./de/months.js";
import { months as monthsEn } from "./en/months.js";

i18n
  // Add React bindings as a plugin.
  .use(initReactI18next)
  // Initialize the i18next instance.
  .init({
    // Config options

    // Specifies the default language (locale) used
    // when a user visits our site for the first time.
    // We use English here, but feel free to use
    // whichever locale you want.
    lng: "de",

    // Fallback locale used when a translation is
    // missing in the active locale. Again, use your
    // preferred locale here.
    fallbackLng: "de",

    // Enables useful output in the browser’s
    // dev console.
    debug: false,

    // Normally, we want `escapeValue: true` as it
    // ensures that i18next escapes any code in
    // translation messages, safeguarding against
    // XSS (cross-site scripting) attacks. However,
    // React does this escaping itself, so we turn
    // it off in i18next.
    interpolation: {
      escapeValue: true,
    },

    resources: {
      de: {
        translation: {
          greeting: "Hi",
          signin: "Anmelden",
          signip: "Anmelden oder Konto erstellen",
          signup: "Konto erstellen",
          logout: "Ausloggen",
          send: "Senden",
          logo: "Logo",
          continue: "Weiter",
          return: "Zurück",
          lookup_greeting:
            "Gib deine E-Mail-Adresse ein, um dich zu registrieren oder anzumelden.",
          login_greeting: "Wie lautet dein Kennwort?",
          register_greeting: "Let's get started!",
          register_greeting2: "Jetzt registrieren und Vorteile sichern!",
          new_pin_greeting:
            "Bitte geben Sie den Code aus Ihrer E-Mail-Adresse ein.",
          http: httpDe,
          error: errorsDe,
          input: inputDe,
          all_months: monthsDe,
          FORGETPWD_pwd_greeting:
            "Bestätige deine E-Mail-Adresse und gib ein neues Kennwort ein.",
          policy_pi_1: "Ich stimmst den ",
          policy_pi_2: " von xFinity Software zu und bestätige, dass ich die ",
          policy_pi_3: " von xFinity Software gelesen habe.",
          terms: "Nutzungsbedingungen",
          privacy_policy: "Datenschutzrichtlinie",
          policy_p_1: "Indem du fortfährst, stimmst du den ",
          policy_p_2: " von xFinity Software zu und bestätigst, dass du die ",
          policy_p_3: " von xFinity Software gelesen hast.",
          seo_kw: "ecommerce, onlineshop",
          edit: "Bearbeiten",
          FORGETPWD_password: "Kennwort vergessen?",
          pwd_src_only: "Passwort zeigen oder verstecken",
          pwd_visible: "Passwort versteckt",
          pwd_hidden: "Passwort sichtbar",
          new_pin: "Code erneut senden",
          new_pin_in: "Code erneut senden in {{throttle}}",
          verify_email_success:
            "Die E-Mail wurde erfolgreich verifiziert. Weiterleitung in ",
          forwarding: "Weiterleitung in ",
          redirect_timer: "Weiterleitung in {{ timer }}",
          close_msg: "Diese Nachricht schließen",
          close_timer_msg: "Diese Nachricht schließen in {{ timer }}",
          profile: "Profil",
          personal_profile: "Persönliches Profil",
          orders: "Bestellungen",
          wishlist: "Wunschzettel",
          account_settings: "Kontoeinstellungen",
          overview: "Übersicht",
          address: "Adresse",
          payment_methods: "Zahlungsarten",
          imprint: "Impressum",
          data_protection: "Datenschutz",
          agbs: "AGB's",
          cancellation_policy: "Widerrufsbelehrungen",
          payment_shipping: "Versand & Zahlung",
          shopping_cart: "Warenkorb",
          servicehelper: "Service/Hilfe",
          sale: "Sale",
          new: "Neuheiten",
          account: "Ihr Konto",
          save: "Speichern",
          cancel: "Abbrechen",
          save_changes: "Änderungen speichern",
          check_your_personality: "Überprüfen Sie Ihre persönlichen Daten.",
          access_data: "Zugangsdaten",
          request_code: "Code anfordern",
          conditions_met: "- Bedingung erfüllt",
          conditions_not_met: "- Bedingung nicht erfüllt",
          search: "Suchen",
          sro_main: "Direkt zum Hauptinhalt springen",
          change_email: "E-Mail-Adresse ändern",
          change_password: "Passwort ändern",
          change_personal: "Personelle Daten ändern",
          personal_data: "Persönliche Daten",
          mark_required: "Die mit einem Stern (*) markierten Felder sind Pflichtfelder.",
          no_required: "Kein Pflichtfeld",
          year: "Jahr",
          month: "Monat",
          day: "Tag",
          salutation: "Anrede",
          not_specified: "Keine Angaben",
          mr: "Herr",
          mrs: "Frau",
          mx: "Divers",
          birthday: "Geburstag",
          dateofbirth: "Geburtsdatum",
          not_found: 'Wir können die Seite, die du suchst, nicht finden.',
          not_found_2: 'Wir entschuldigen uns für die Unannehmlichkeiten.',
        },
      },
      en: {
        translation: {
          greeting: "Hi",
          signin: "Sign In",
          signip: "Sign in or Sign Up",
          signup: "Sign Up",
          logout: "Logout",
          send: "Send",
          logo: "Logo",
          continue: "Continue",
          return: "Back",
          lookup_greeting: "Enter your email address to register or log in.",
          login_greeting: "What is your password?",
          register_greeting: "Let's get started!",
          register_greeting2: "Register now and secure benefits!",
          new_pin_greeting: "Please enter the code from your email address.",
          FORGETPWD_pwd_greeting:
            "Bestätige deine E-Mail-Adresse und gib ein neues Kennwort ein.",
          http: httpEn,
          error: errorsEn,
          input: inputEn,
          all_months: monthsEn,
          policy_p_1: "By continuing, you agree to xFinity Software ",
          policy_p_2: " and acknowledge that you have read xFinity Software ",
          policy_p_3: ".",
          terms: "Terms of Use",
          privacy_policy: "Privacy Policy",
          seo_kw: "ecommerce, onlineshop",
          edit: "Edit",
          FORGETPWD_password: "Forgot your password?",
          pwd_src_only: "Show or hide password",
          pwd_visible: "Password hidden",
          pwd_hidden: "Password visible",
          new_pin: "Send the code again",
          new_pin_in: "Send the code again in {{throttle}}",
          verify_email_success:
            "The email was successfully verified. Forwarding to ",
          forwarding: "Forwarding to ",
          redirect_timer: "Forwarding to {{ timer }}",
          close_msg: "Close this message",
          close_timer_msg: "Close this message in {{ timer }}",
          profile: "Profile",
          personal_profile: "Personal Profile",
          orders: "Orders",
          wishlist: "Wishlist",
          account_settings: "Account settings",
          overview: "Overview",
          address: "Address",
          payment_methods: "Payment Methods",
          imprint: "Imprint",
          data_protection: "Privacy Policy",
          agbs: "TOU",
          cancellation_policy: "Cancellation Policy",
          payment_shipping: "Payment and Shipping",
          shopping_cart: "Shopping Cart",
          servicehelper: "Service/Help",
          sale: "Sale",
          new: "New",
          account: "Your Account",
          save: "Save",
          cancel: "Cancel",
          save_changes: "Save changes",
          check_your_personality: "Check your personal information.",
          access_data: "Access Data",
          request_code: "Request code",
          conditions_met: "- conditions met",
          conditions_not_met: "- conditions not met",
          search: "Search",
          sro_main: "Skip to main content",
          change_email: "Change email address",
          change_password: "Change password",
          change_personal: "Change personal data",
          personal_data: "Personal data",
          mark_required: "Fields marked with an asterisk (*) are mandatory.",
          no_required: "No required field",
          year: "Year",
          month: "Month",
          day: "Day",
          salutation: "Salutation",
          not_specified: "Not specified",
          mr: "Mr.",
          mrs: "Mrs.",
          mx: "Mx.",
          birthday: "Birthday",
          dateofbirth: "Date of birth",
          not_found: "We can't find the page you're looking for.",
          not_found_2: "We apologize for the inconvenience.",
        },
      },
    },
  });

export default i18n;
