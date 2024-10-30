import { FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo } from 'react';

interface Props {
  options?: string[];
  optionsToDisable?: string[];
  timeFormat?: string;
  minuteInterval?: number;
  startTime?: string;
  endTime?: string;
  value: string | undefined;
  onChange: (e: SelectChangeEvent<string>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  helperText?: string;
}

const generateTimeSlots = (
  interval: number,
  start: string = '0000',
  end: string = '2400'
): string[] => {
  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 100);
    const minutes = time % 100;
    return `${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}`;
  };

  const parseTime = (timeStr: string): number => {
    const hours = parseInt(timeStr.slice(0, 2), 10);
    const minutes = parseInt(timeStr.slice(2), 10);
    return hours * 100 + minutes;
  };

  const startNumber = parseTime(start);
  const endNumber = parseTime(end);

  const timeSlots: string[] = [];
  let currentTime = startNumber;

  while (currentTime <= endNumber) {
    timeSlots.push(formatTime(currentTime));

    const currentHour = Math.floor(currentTime / 100);
    const currentMinute = currentTime % 100;
    const nextMinute = currentMinute + interval;

    let nextTime;
    if (nextMinute >= 60) {
      nextTime = (currentHour + Math.floor(nextMinute / 60)) * 100 + (nextMinute % 60);
    } else {
      nextTime = currentHour * 100 + nextMinute;
    }
    if (nextTime > endNumber) {
      break;
    }
    currentTime = nextTime;
  }

  return timeSlots;
};

const DEFAULT_TIME_INTERVAL = 30;

const TimeSelect = ({
  options,
  optionsToDisable,
  timeFormat,
  minuteInterval = DEFAULT_TIME_INTERVAL,
  startTime,
  endTime,
  value,
  onChange,
  disabled = false,
  readOnly = false,
  error = false,
  helperText,
}: Props) => {
  const timeOptions = useMemo(
    () => options ?? generateTimeSlots(minuteInterval, startTime, endTime),
    [options, minuteInterval, startTime, endTime]
  );

  const handleChange = (e: SelectChangeEvent<string>) => {
    onChange(e);
  };

  return (
    <FormControl fullWidth error={error} disabled={disabled}>
      <Select value={value} onChange={handleChange} inputProps={{ readOnly: readOnly }}>
        {timeOptions &&
          timeOptions.map((option) => (
            <MenuItem
              disabled={optionsToDisable ? optionsToDisable.includes(option) : false}
              value={option}
            >
              {timeFormat ? dayjs(`19700101${option}`).format(timeFormat) : option}
            </MenuItem>
          ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default TimeSelect;
