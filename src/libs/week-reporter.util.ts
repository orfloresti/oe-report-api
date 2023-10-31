import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

// use plugin
dayjs.extend(weekOfYear);

/**
 * Function to get the weeks number of the selected range
 * @param start
 * @param end
 * @returns string
 */
export const getWeeksNumber = (start: string, end: string): string => {
  const startDate = dayjs(start).week();
  const endDate = dayjs(end).week();

  let weeksNumber = "";
  if (!startDate && !endDate) {
    weeksNumber = "";
  }
  if (startDate === endDate) {
    weeksNumber = `Week ${startDate}`;
  }
  if (startDate !== endDate) {
    weeksNumber = `Week ${startDate} to ${endDate}`;
  }
  return weeksNumber;
};

/**
 * Function to get the complete list of days
 * @param start
 * @param end
 * @returns string[]
 */
export const getListOfDays = (start: string, end: string): string[] => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  const diff = endDate.diff(startDate, "d") + 1;

  let days: string[] = [];

  for (let i = 0; i < diff; i++) {
    const day = startDate.add(i, "d").format("MMDDYYYY");
    days.push(day);
  }

  return days;
};
