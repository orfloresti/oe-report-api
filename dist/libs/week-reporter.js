"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.weekReport = void 0;
const day_reporter_util_1 = require("./day-reporter.util");
// import { cookie, dates, personId } from "../config";
const weekReport = (personId, cookie) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const dates = [];
    // Get report for each day
    const days = yield (0, day_reporter_util_1.getReportSeveralDays)(
      dates,
      personId,
      cookie
    );
    // Get total types of activities in all days
    const types = (0, day_reporter_util_1.getActivityTypesSeveralDays)(days);
    // Include mins type to sum all time:
    types.push("mins");
    // Get total report
    const totalReport = (0, day_reporter_util_1.getTotalReport)(days, types);
    // Calculate total hours using minuts and saving in a new prop named hours
    totalReport["hours"] = totalReport["mins"] / 60;
    // Show total report
    return totalReport;
  });
exports.weekReport = weekReport;
