import { getActivityTypesSeveralDays, getReportSeveralDays, getTotalReport } from "./libs/day-reporter.util";
import { cookie, dates, personId } from "./config";

(async () => {
  // Get report for each day
  const days = await getReportSeveralDays(dates, personId, cookie);  

  // Get total types of activities in all days
  const types = getActivityTypesSeveralDays(days);
  
  // Include mins type to sum all time:
  types.push("mins");

  // Get total report
  const totalReport = getTotalReport(days, types);

  // Calculate total hours using minuts and saving in a new prop named hours
  totalReport['hours'] =  totalReport['mins'] / 60;

  // Show total report
  console.log(totalReport);
})();