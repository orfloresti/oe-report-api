import { cookie, dates, personId } from "./config";
import { OpenEnglish } from "./libs/open-english";
import { DayReporter } from "./libs/day-reporter";

export const getActivityTypes = (days: string[]): string[] => {
  let types: string[] = [];
  days.forEach((day: any) => {
    types = types.concat(day.types);
  });

  return [...new Set(types)];
};

(async () => {
  const days: any[] = [];
  for (const date of dates) {
    const { data } = await OpenEnglish(date, personId, cookie);
    const report = new DayReporter(data, date);
    days.push(report.getResult());
  }

  const types = getActivityTypes(days);
  // Include mins to sum all time:
  types.push("mins");

  const totalReport: {[key: string]: any} = {};
  days.forEach((day) => {
    Object.keys(day).forEach((key: string) => {
      if (types.includes(key)) {
        totalReport[key] = !!totalReport[key]
          ? totalReport[key] + day[key]
          : day[key];
      }
    });
  });

  // Calculate total hours using minuts and saving in a new prop named hours
  totalReport['hours'] =  totalReport['mins'] / 60;

  // Show total report
  console.log(totalReport);
})();