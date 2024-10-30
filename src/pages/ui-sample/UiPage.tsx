import { useEffect, useState } from 'react';
import TimeSelect from './component/TimeSelect';

const UiPage: React.FC = () => {
  const [timeOptions] = useState<string[]>(['1000', '1100', '1200', '1300', '1400']);
  const [disableTimeOptions] = useState<string[]>(['1100']);

  const [time1, setTime1] = useState<string>('1000');
  const [time2, setTime2] = useState<string>();

  useEffect(() => {
    console.log('time1:', time1);
  }, [time1]);

  useEffect(() => {
    console.log('time2:', time2);
  }, [time2]);

  return (
    <>
      <TimeSelect
        options={timeOptions}
        optionsToDisable={disableTimeOptions}
        value={time1}
        onChange={(e) => {
          setTime1(e.target.value);
        }}
        timeFormat="HH:mm"
      />
      <TimeSelect
        minuteInterval={30}
        startTime="0900"
        endTime="1800"
        optionsToDisable={disableTimeOptions}
        value={time2}
        onChange={(e) => {
          setTime2(e.target.value);
        }}
        timeFormat="HH:mm"
      />
    </>
  );
};

export default UiPage;
