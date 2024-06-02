import { Suspense, useEffect } from 'react';
import { worker } from './mocks/browser';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './react-query/queryClient';
import { Routes } from './routers/Routes';
import useEmployeeSessionStore from './stores/EmployeeSessionStore';
import sessionApi from './api/sessionApi';
import HeaderBar from './components/organisms/HeaderBar';
import HorizonMenu from './components/organisms/HorizonMenu';

await worker.start({ onUnhandledRequest: 'bypass' });

function App() {
  const { employeeId, setEmployeeSession } = useEmployeeSessionStore();

  useEffect(() => {
    if (!employeeId) {
      (async () => {
        //cookie로 조회
        // await sessionApi.autoLogin(idToken);
        const response = await sessionApi.getEmployeeSession();
        if (response.successOrNot === 'Y' && response?.data) {
          const session = response.data;
          setEmployeeSession(session);
          console.log('auto login success');
        } else {
          console.log('auto login fail');
          //navigate('/login', { replace: true });
        }
      })();
    }
  }, [employeeId, setEmployeeSession]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<></>}>
          <Routes />
        </Suspense>
      </QueryClientProvider>
    </>
  );
}

export default App;
