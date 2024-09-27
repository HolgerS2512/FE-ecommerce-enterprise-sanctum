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
import { countries as countriesDe } from "./de/countries.js";
import { countries as countriesEn } from "./en/countries.js";
import { cookie as cookieDe } from "./de/cookie.js";
import { cookie as cookieEn } from "./en/cookie.js";

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
          country: countriesDe,
          all_months: monthsDe,
          cookie: cookieDe,
          maintenance: {
            title: "Wartungsarbeiten",
            message: "Diese Seite ist momentan nicht verfügbar, da wir Wartungsarbeiten durchführen.",
            message2: "Wir sind in Kürze wieder für Sie erreichbar."
          },
          FORGETPWD_pwd_greeting:
            "Bestätige deine E-Mail-Adresse und gib ein neues Kennwort ein.",
          policy_pi_1: "Ich stimmst den ",
          policy_pi_2: " von {{ companyName }} zu und bestätige, dass ich die ",
          policy_pi_3: " von {{ companyName }} gelesen habe.",
          terms: "Nutzungsbedingungen",
          privacy_policy: "Datenschutzrichtlinie",
          policy_p_1: "Indem du fortfährst, stimmst du den ",
          policy_p_2: " von {{ companyName }} zu und bestätigst, dass du die ",
          policy_p_3: " von {{ companyName }} gelesen hast.",
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
          forwarding_to: "Weiterleitung nach {{ route }}",
          forwarding: "Weiterleitung in ",
          redirect_timer: "Weiterleitung in {{ timer }}",
          close_msg: "Diese Nachricht schließen",
          close_timer_msg: "Diese Nachricht schließen in {{ timer }}",
          profile: "Profil",
          homepage: 'Startseite',
          personal_profile: "Persönliches Profil",
          orders: "Bestellungen",
          wishlist: "Wunschzettel",
          account_settings: "Kontoeinstellungen",
          settings: "Einstellungen",
          overview: "Übersicht",
          addresses: "Adressen",
          payment_methods: "Zahlungsarten",
          add_payment_methods: "Zahlungsarten hinzufügen",
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
          mark_required:
            "Die mit einem Stern (*) markierten Felder sind Pflichtfelder.",
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
          not_found: "Wir können die Seite, die du suchst, nicht finden.",
          not_found_2: "Wir entschuldigen uns für die Unannehmlichkeiten.",
          saved_delivery_address: "Gespeicherte Lieferadressen",
          saved_payment_methods: "Gespeicherte Zahlungsarten",
          zero_address:  "Du hast aktuell keine Lieferadressen hinterlegt. Füge eine Adresse hinzu, um den Bezahlvorgang zu beschleunigen.",
          zero_payment_meths: "Du hast aktuell keine Zahlungsmethode hinterlegt. Füge eine Standardzahlungsmethode hinzu, um den Bezahlvorgang zu beschleunigen.",
          add_address: "Adresse hinzufügen",
          as_primary_address: "Als Standardversandadresse verwenden",
          close_window: "Dieses Fenster schließen",
          tab_select_field: "Auswahlfeld Enter taste drücken zum bearbeiten",
          empty: "leer",
          standard_delivery_address: "Standardlieferadresse",
          standard_delivery_payment_methods: "Standard Zahlungsmethode",
          delete: "Löschen",
          update: "Aktualisieren",
          delete_address_action:
            "Sind Sie sicher, dass Sie diese Adresse löschen wollen?",
          subscribe_to_newsletter:
            "Registriere dich für E-Mails, um aktuelle Informationen von {{ companyName }} zu Produkten und Angeboten sowie deinen Vorteilen als Kunde zu erhalten.",
          yes_want_emails: "Ja, ich möchte E-Mails erhalten.",
          community_informations:
            "Erhalte exklusive Infos zu neuen Produkten, aktuellen Angeboten und deinen Vorteilen als Teil unserer Community.",
          notification_setting: "Mitteilungseinstellung",
          change_general_notifications: "Allgemeine Mitteilung ändern",
          delete_account: "Konto löschen",
          question_delete_account: "Möchtest du dein Konto wirklich löschen?",
          checkbox_delete_account:
            "Ja, ich möchte mein Konto löschen. Ich kann diesen Vorgang nicht rückgängig machen.",
          customer_service: "Kundenservice",
          benefits_account_holders:
            "Als Kontoinhaber kannst du derzeit folgende Vorteile nutzen:",
          benefits_fast_payment: "Schnelle Bezahlvorgänge bei jedem Einkauf",
          benefits_personal_wishlist:
            "Eine persönliche Wunschliste, auf der du Produkte dauerhaft speichern kannst",
          benefits_exclusive_newsletter:
            "Exklusive Infos zu neuen Produkten, aktuellen Angeboten und deinen Vorteilen als Teil unserer Community",
          consequence_delete_konto:
            "Das Löschen deines Kontos bedeutet Folgendes:",
          consequence_no_action_account:
            "Du kannst nicht mehr auf dein {{ companyName }} Konto zugreifen",
          consequence_da_infos:
            "Informationen zu deinen Bestellungen erhältst du nur, indem du den ",
          consequence_da_infoe: " kontaktierst.",
          information_note_da:
            "Informationen, die auf sozialen Netzwerken und Plattformen außerhalb von {{ companyName }} geteilt wurden, sind nicht betroffen.",
          change_cookie_settings: "Cookie-Einstellungen ändern",
          data_protection_setting_txt:
            "Wir nutzen Cookies und ähnliche Technologien von {{ companyName }} sowie von Dritten, um dein Benutzererlebnis auf unseren Plattformen zu verbessern und dir relevantere Inhalte und Informationen anzuzeigen. Du kannst deine Cookie- und andere Datenschutzeinstellungen unten anpassen.",
          data_protection_setting_txt2:
            "Änderungen, die du an den Datenschutzeinstellungen vornimmst, werden dauerhaft gespeichert. Weitere Informationen findest du in unseren ",
          privacy_and_cookie_policy: "Datenschutz- und Cookie-Richtlinien",
          cookie_required_request_route:
            "Um auf diese Funktion zugreifen zu können, müssen Sie der Verwendung von essenziellen Cookies zustimmen, die für den ordnungsgemäßen Betrieb erforderlich sind.",
          privacy_and_cookie_settings: "Datenschutz- und Cookie-Einstellungen",
          sro_all_allow: "Direkt zur Cookie Bestätigung springen",
          name: 'Name',
          zero_orders: 'Du hast aktuell noch keine Bestellungen',
          topseller: 'Topseller',
          highest_reduction: 'Höhste Reduzierung',
          price_high: 'Höhster Preis',
          price_low: 'Niedrigster Preis',
          new: 'Neu hinzugefügt',
          sorted_by: 'Sortiert nach',
          hide_filters: 'Filter verbergen',
          show_filters: 'Filter anzeigen',
          close_filters: 'Filter Schließen',
          filters: 'Filtern',
          filter_by: 'Filtern nach',
          filters_settings: 'Produktfilter-Einstellungen',
          filters_sort_settings: 'Produktfilter- und Sortiereinstellungen', 
          apply: 'Anwenden',
          products: 'Produkte',
          section: 'Abschnitt',
          price: 'Preis',
          size: 'Größe',
          color: 'Farbe',
          brand: 'Marke',
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
          country: countriesEn,
          cookie: cookieEn,
          maintenance: {
            title: "Maintenance",
            message: "This site is currently unavailable due to maintenance.",
            message2: "We will be available to you again shortly.",
          },
          policy_p_1: "By continuing, you agree to {{ companyName }} ",
          policy_p_2: " and acknowledge that you have read {{ companyName }} ",
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
          forwarding_to: "Forwarding to {{ route }}",
          forwarding: "Forwarding in ",
          redirect_timer: "Forwarding in {{ timer }}",
          close_msg: "Close this message",
          close_timer_msg: "Close this message in {{ timer }}",
          profile: "Profile",
          homepage: 'Homepage',
          personal_profile: "Personal Profile",
          orders: "Orders",
          wishlist: "Wishlist",
          account_settings: "Account settings",
          settings: "Settings",
          overview: "Overview",
          addresses: "Addresses",
          payment_methods: "Payment Methods",
          add_payment_methods: "Add Payment Methods",
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
          not_found: "We can't find the page you are looking for.",
          not_found_2: "Sorry for the inconvenience.",
          saved_delivery_address: "Saved delivery addresses",
          saved_payment_methods: "Saved Payment Methods",
          zero_address:
            "You currently have no delivery addresses stored. Add an address to speed up the payment process.",
          zero_payment_meths: "You don't currently have a payment method stored. Add a default payment method to speed up the checkout process.",
          add_address: "Add Address",
          as_primary_address: "Use as default shipping address",
          close_window: "Close this window",
          tab_select_field: "Selection field Press Enter key to edit",
          empty: "empty",
          standard_delivery_address: "Standard delivery address",
          standard_delivery_payment_methods: "Standard Payment Method",
          delete: "Delete",
          update: "Update",
          delete_address_action:
            "Are you sure you want to delete this address?",
          subscribe_to_newsletter:
            "Sign up for emails to receive up-to-date information from {{ companyName }} about products and offers as well as your benefits as a customer.",
          yes_want_emails: "Yes, I would like to receive emails.",
          community_informations:
            "Receive exclusive information about new products, current offers and your benefits as part of our community.",
          notification_setting: "Notification Setting",
          change_general_notifications: "Change General Notification",
          delete_account: "Delete Account",
          checkbox_delete_account:
            "Yes, I want to delete my account. I cannot undo this process.",
          customer_service: "Customer Service",
          benefits_account_holders:
            "As an account holder, you can currently enjoy the following benefits:",
          benefits_fast_payment: "Fast payment processes for every purchase",
          benefits_personal_wishlist:
            "A personal wish list where you can save products permanently",
          benefits_exclusive_newsletter:
            "Exclusive information about new products, current offers and your benefits as part of our community",
          consequence_delete_konto:
            "Deleting your account means the following:",
          consequence_no_action_account:
            "You can no longer access your {{ companyName }} account",
          consequence_da_infos:
            "You can only obtain information about your orders by contacting ",
          consequence_da_infoe: ".",
          information_note_da:
            "Information shared on social networks and platforms outside of {{ companyName }} is not affected.",
          change_cookie_settings: "Change Cookie Settings",
          data_protection_setting_txt:
            "We use cookies and similar technologies from {{ companyName }} and third parties to improve your experience on our platforms and show you more relevant content and information. You can adjust your cookie and other privacy settings below.",
          data_protection_setting_txt2:
            "Changes you make to the privacy settings will be saved permanently. For more information, see our ",
          privacy_and_cookie_policy: "Privacy and Cookie Policy",
          privacy_and_cookie_settings: "Privacy and Cookie Settings",
          cookie_required_request_route: "To access this feature, you must consent to the use of essential cookies, which are necessary for the proper functioning of the service.",
          sro_all_allow: "Jump directly to cookie confirmation",
          name: 'Name',
          zero_orders: 'You currently have no orders',
          topseller: 'Topseller',
          highest_reduction: 'Highest Reduction',
          price_high: 'Highest Price',
          price_low: 'Lowest Price',
          new: 'New',
          sorted_by: 'Sorted by',
          hide_filters: 'Hide Filters',
          show_filters: 'Show Filters',
          close_filters: 'Close Filters',
          filters: 'Filters',
          filter_by: 'Filter by',
          filters_settings: 'Product Filter Settings',
          filters_sort_settings: 'Product Filter and Sort Settings',
          apply: 'Apply',
          products: 'Products',
          section: 'Section',
          price: 'Price',
          size: 'Size',
          color: 'Color',
          brand: 'Brand',
        },
      },
    },
  });

export default i18n;
