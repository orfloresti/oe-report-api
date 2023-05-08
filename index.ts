import { cookie, dates, personId } from "./config";
import { OpenEnglish } from "./libs/open-english";
import { DayReporter } from "./libs/day-reporter";

const rangeReporter = async () => {
  const days: any[] = [];
  for (const date of dates) {
    const { data } = await OpenEnglish(date, personId, cookie);
    const report = new DayReporter(data, date);
    days.push(report.getResult());
  }
  console.log(days);
};

rangeReporter();
