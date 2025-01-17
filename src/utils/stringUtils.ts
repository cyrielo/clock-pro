import { TimeStamp } from "../types";

export const upperCaseFirst = (str:string): string  => {
  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
};

export const getTimeObj = (timestamp:number):TimeStamp => {
  if (!timestamp || timestamp < 0) {return {} as TimeStamp};
  const hours = Math.floor(timestamp / 3600000); // 3600000 ms in 1 hour
  const minutes = Math.floor((timestamp % 3600000) / 60000); // 60000 ms in 1 minute
  const seconds = Math.floor((timestamp % 60000) / 1000); // 1000 ms in 1 second
  const milliseconds = timestamp % 1000; // Remaining milliseconds

  const timeStamp: TimeStamp = {
    hours: (hours > 0 ? hours : 0),
    minutes: (minutes > 0 ? minutes : 0),
    seconds: (seconds > 0 ? seconds : 0),
    milliseconds: (milliseconds > 0 ? milliseconds : 0)
  };
  return timeStamp;
}
