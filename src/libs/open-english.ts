import axios, { AxiosResponse } from "axios";
import https from "https";

const instance = axios.create();

/**
 * @param date in format 'mmddaaaa'
 * @param personId
 * @param cookie
 * @returns url as string
 */
export const OpenEnglish = (
  date: string,
  personId: string,
  cookie: string
): Promise<AxiosResponse> => {
  const url = `https://student.openenglish.com/activities/details?personId=${personId}&date=${date}&_=1683306957329`;
  return instance.get(url, {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
    headers: {
      Cookie: cookie,
    },
  });
};
