import { useTranslation } from "react-i18next"
import { Checkmark, Xclose } from "../icon/Icons";

const PasswordAddition = ({ chars, addition, checked, tabIndex = 1 }) => {
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
    </div>
  )
}

export default PasswordAddition
