import { activity } from "../interfaces/activity.interface";

/**
 * Formart input: 'aaaa-mm-dd'  output: 'mmddaaaa'
 * @param dates: string[]
 */
export const changeDateFormat = (dates: string[]) => {
  return dates.map(
    (date) =>
      `${date[5]}${date[6]}${date[8]}${date[9]}${date[0]}${date[1]}${date[2]}${date[3]}`
  );
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
