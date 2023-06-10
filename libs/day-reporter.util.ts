import { activity } from "../interfaces/activity.interface";
import { DayReporter } from "./day-reporter";
import { OpenEnglish } from "./open-english";

/**
 * Format input: 'aaaa-mm-dd'  output: 'mmddaaaa'
 * @param dates: string[]
 */
export const changeDateFormat = (dates: string[]) => {
  return dates.map(
    (date) =>
      `${date[5]}${date[6]}${date[8]}${date[9]}${date[0]}${date[1]}${date[2]}${date[3]}`
  );
};

/**
 * Format input: 'mmddaaaa'  output: 'aaaa-mm-dd'
 * @param date: string
 */
export const dateOpenEnglishToIsoFormat = (date: string) => {
  return `${date[4]}${date[5]}${date[6]}${date[7]}-${date[0]}${date[1]}-${date[2]}${date[3]}`;
};

/**
 * Return list of activities types based on activities list
 * @param data: activity[]
 * @returns string[]
 */
export const getActivityTypes = (data: activity[]): string[] => {
  return [...new Set(data.map((act) => act.courseType))];
};

/**
 * 
 * @param days 
 * @returns 
 */
export const getActivityTypesSeveralDays = (days: {[key: string]: any }[]): string[] => {
  let types: string[] = [];
  days.forEach((day: any) => {
    types = types.concat(day.types);
  });

  return [...new Set(types)];
};


/**
 * Function to calculate total minutes worked in current activities list
 * @param data activity[]
 * @returns total minutes of all activities
 */
export const getTotalMins = (data: activity[]): number => {
  let mins = 0;
  data.forEach((element: activity) => {
    mins = mins + (element.dateCompleted - element.dateStarted);
  });
  return mins / 60000;
};

/**
 * Function to calculate quantity of activities in current list
 * @param data activity[]
 */
export const countByType = (data: activity[]) => {
  const acc: { [key: string]: any } = {};

  const types = getActivityTypes(data);
  types.forEach((type) => {
    const filterDataByType = data.filter((act) => act.courseType === type);
    acc[type] = filterDataByType.length;
  });
  return acc;
};

/**
 * 
 * @param dates 
 * @param personId 
 * @param cookie 
 * @returns 
 */
export const getReportSeveralDays = async(dates: string[], personId: string, cookie: string) =>{
  const days: {[key: string]: any }[] = [];
  for (const date of dates) {
    const { data } = await OpenEnglish(date, personId, cookie);
    const report = new DayReporter(data, date);
    days.push(report.getResult());
  }

  return days;
}

/**
 * 
 * @param days 
 * @param types 
 * @returns 
 */
export const getTotalReport = (days: {[key: string]: any }, types: string[]) => {
  const totalReport: {[key: string]: any} = {};
  days.forEach((day: {[key: string]: any }) => {
    Object.keys(day).forEach((key: string) => {
      if (types.includes(key)) {
        totalReport[key] = !!totalReport[key]
          ? totalReport[key] + day[key]
          : day[key];
      }
    });
  });

  return totalReport;
}