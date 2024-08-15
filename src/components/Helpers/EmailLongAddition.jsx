import { useTranslation } from "react-i18next"
import { Checkmark, Xclose } from "../icon/Icons";

const EmailLongAddition = ({ valid, newold, confirmation, checked, tabIndex = 1 }) => {
  const {t} = useTranslation();
  return (
    <div className="mb-4">
      <div className="svg-box">
        {valid ?
         <Checkmark clr={checked ? (valid ? '198754' : 'd11f46') : '666'} /> :
         <Xclose clr={checked ? (valid ? '198754' : 'd11f46') : '666'} />} <small 
          aria-readonly={`${t('error.emails_valid')} ${checked ? t(valid ? 'conditions_met' : 'conditions_not_met') : ''}`} 
          tabIndex={tabIndex}

          style={{ 
            color: checked ? (!valid ? '#d11f46' : '#198754') : '#666'
          }}
         >
          {t('error.emails_valid')}
         </small>
      </div>

      <div className="svg-box">
        {newold ?
         <Checkmark clr={checked ? (newold ? '198754' : 'd11f46') : '666'} /> :
         <Xclose clr={checked ? (newold ? '198754' : 'd11f46') : '666'} />} <small 
          aria-readonly={`${t('error.email_new_match')} ${checked ? t(newold ? 'conditions_met' : 'conditions_not_met') : ''}`}
          tabIndex={tabIndex}

          style={{ 
              color: checked ? (!newold ? '#d11f46' : '#198754') : '#666'
            }}
         >
          {t('error.email_new_match')}
         </small>
      </div>

      <div className="svg-box">
        {confirmation ?
         <Checkmark clr={checked ? (confirmation ? '198754' : 'd11f46') : '666'} /> :
         <Xclose clr={checked ? (confirmation ? '198754' : 'd11f46') : '666'} />} <small 
          aria-readonly={`${t('error.email_confirmation')} ${checked ? t(confirmation ? 'conditions_met' : 'conditions_not_met') : ''}`}
          tabIndex={tabIndex}

          style={{ 
              color: checked ? (!confirmation ? '#d11f46' : '#198754') : '#666'
            }}
         >
          {t('error.email_confirmation')}
         </small>
      </div>
      
    </div>
  )
}

export default EmailLongAddition
