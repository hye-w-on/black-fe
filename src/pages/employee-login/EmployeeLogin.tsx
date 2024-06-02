import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import i18n from '../../i18n';
import BasicInput from '../../components/atoms/Input';
import { BasicButton } from '../../components/atoms/Button';
import { EmployeeLoginRequest } from '../../models/session';
import sessionApi from '../../api/sessionApi';
import HttpSessionScope from './HttpSessionScope';
import useEmployeeSessionStore from '../../stores/EmployeeSessionStore';
const EmployeeLogin = () => {
  const { setEmployeeSession } = useEmployeeSessionStore();
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState<string>('admin');

  const handleLogin = async () => {
    const employeeLoginRequest: EmployeeLoginRequest = {
      employeeId: employeeId,
    };
    const response = await sessionApi.employeeLogin(employeeLoginRequest);
    if (response.successOrNot === 'Y' && response?.data) {
      const session = response.data;
      i18n.changeLanguage(session.languageCode || 'ko');
      setEmployeeSession(session);
      //navigate('/', { replace: true });
      console.log('Login Success', session);
    } else {
      console.log('Login Fail');
    }
  };

  return (
    <>
      <BasicInput
        value={employeeId}
        onChange={(e) => {
          setEmployeeId(e.target.value);
        }}
      />
      <BasicButton onClick={handleLogin}>Employee Login</BasicButton>
      <HttpSessionScope />
    </>
  );
};

export default EmployeeLogin;
