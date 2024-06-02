import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styled from '@emotion/styled';
import i18n, { languageCode } from '../../i18n';
import { BasicButton } from '../atoms/Button';
import EmployeeLogin from '../../pages/employee-login/EmployeeLogin';
import useEmployeeSessionStore from '../../stores/EmployeeSessionStore';

const HeaderBar = () => {
  const { t } = useTranslation();
  const { employeeId, name } = useEmployeeSessionStore();

  const handleChangeLanguage = (lang: languageCode) => {
    // 서버로부터 다국어 json을 받아서 i18n에 추가하는 Case
    //i18n.addResourceBundle(response.languageCode, 'translation', response.translatedMessages);
    //i18n.changeLanguage(lang);
    //i18n.reloadResources();
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <h2>{name}님 안녕하세요</h2>
      <BasicButton>
        <Link to="/login/social">Social Login</Link>
      </BasicButton>
      <BasicButton>
        <Link to="/signup">Sign Up</Link>
      </BasicButton>
      <EmployeeLogin />
      <BasicButton
        onClick={() => {
          handleChangeLanguage(languageCode.EN);
        }}
      >
        English
      </BasicButton>
      <BasicButton
        onClick={() => {
          handleChangeLanguage(languageCode.KO);
        }}
      >
        Korean
      </BasicButton>
      <Span style={{ margin: '10px' }}>{t('language')}</Span>
      <hr />
    </>
  );
};

export default HeaderBar;

const Span = styled.span`
  margin: 10px;
  vertical-align: middle;
  //border: 1px solid black;
`;
