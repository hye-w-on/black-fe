import sessionApi from '../../api/sessionApi';

const HttpSessionScope = () => {
  /* 로그인 후 서버에서 로그로 각 Scope별 데이터 확인 */
  const checkHttpSessionScope = async () => {
    await sessionApi.checkHttpSessionScope();
  };

  return (
    <>
      <button onClick={checkHttpSessionScope}>Test HttpSession Scope</button>
    </>
  );
};

export default HttpSessionScope;
