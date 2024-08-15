import { useTranslation } from "react-i18next"
import { Checkmark, Xclose } from "../icon/Icons";

const PasswordLongAddition = ({ chars, addition, newold, confirmation, checked, tabIndex = 1 }) => {
  const {t} = useTranslation();
  return (
    <div className="mb-4">
      <div className="svg-box">
        {chars ?
         <Checkmark clr={checked ? (chars ? '198754' : 'd11f46') : '666'} /> :
         <Xclose clr={checked ? (chars ? '198754' : 'd11f46') : '666'} />} <small 
          aria-readonly={`${t('error.pwd_addition_char')} ${checked ? t(chars ? 'conditions_met' : 'conditions_not_met') : ''}`} 
          tabIndex={tabIndex}

          style={{ 
            color: checked ? (!chars ? '#d11f46' : '#198754') : '#666'
          }}
         >
          {t('error.pwd_addition_char')}
         </small>
      </div>

      <div className="svg-box">
        {addition ?
         <Checkmark clr={checked ? (addition ? '198754' : 'd11f46') : '666'} /> :
         <Xclose clr={checked ? (addition ? '198754' : 'd11f46') : '666'} />} <small 
          aria-readonly={`${t('error.pwd_additions')} ${checked ? t(addition ? 'conditions_met' : 'conditions_not_met') : ''}`}
          tabIndex={tabIndex}

          style={{ 
              color: checked ? (!addition ? '#d11f46' : '#198754') : '#666'
            }}
         >
          {t('error.pwd_additions')}
         </small>
      </div>

      <div className="svg-box">
        {newold ?
         <Checkmark clr={checked ? (newold ? '198754' : 'd11f46') : '666'} /> :
         <Xclose clr={checked ? (newold ? '198754' : 'd11f46') : '666'} />} <small 
          aria-readonly={`${t('error.password_new_match')} ${checked ? t(newold ? 'conditions_met' : 'conditions_not_met') : ''}`}
          tabIndex={tabIndex}

          style={{ 
              color: checked ? (!newold ? '#d11f46' : '#198754') : '#666'
            }}
         >
          {t('error.password_new_match')}
         </small>
      </div>
      
      <div className="svg-box">
        {confirmation ?
         <Checkmark clr={checked ? (confirmation ? '198754' : 'd11f46') : '666'} /> :
         <Xclose clr={checked ? (confirmation ? '198754' : 'd11f46') : '666'} />} <small 
          aria-readonly={`${t('error.password_confirmation')} ${checked ? t(confirmation ? 'conditions_met' : 'conditions_not_met') : ''}`}
          tabIndex={tabIndex}

          style={{ 
              color: checked ? (!confirmation ? '#d11f46' : '#198754') : '#666'
            }}
         >
          {t('error.password_confirmation')}
         </small>
      </div>
    </div>
  )
}

export default PasswordLongAddition
