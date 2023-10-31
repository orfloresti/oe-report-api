"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenEnglish = void 0;
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const instance = axios_1.default.create();
/**
 * @param date in format 'mmddaaaa'
 * @param personId
 * @param cookie
 * @returns url as string
 */
const OpenEnglish = (date, personId, cookie) => {
  const url = `https://student.openenglish.com/activities/details?personId=${personId}&date=${date}&_=1683306957329`;
  return instance.get(url, {
    httpsAgent: new https_1.default.Agent({
      rejectUnauthorized: false,
    }),
    headers: {
      Cookie: cookie,
    },
  });
};
exports.OpenEnglish = OpenEnglish;
