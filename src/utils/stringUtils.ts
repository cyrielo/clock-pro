import { format } from "date-fns";
import { TimeStamp } from "../types";
import CryptoJS from 'crypto-js';


export const upperCaseFirst = (str:string): string  => {
  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
};

// only pads single digits numbers
export const padNumber = (val:number, zeroCount:number = 1) : string => {
  return (val <= 9 && val >= -9) ? `${'0'.repeat(zeroCount)}${val}`: `${val}`;
}

export const timeToMilliseconds = (val:number|string, hand: 'hours'|'minutes'|'seconds') : number => {
  if (typeof val != 'number') { val = parseInt(val, 10) || 0 }
  switch(hand){
    case "hours":
      return val * 3600000;
    case "minutes":
      return val * 60000;
    case "seconds":
      return val * 1000;
    default:
      return 0;
  }
}

export const createHash = (str?:string):string => {
  const finalString = str ? str : `${Math.ceil(Math.random() * 10128)}`;
  return CryptoJS.MD5(finalString).toString();
}

export const formatTimeString = (date:Date) :string => {
  return format(date, 'hh:mm aa');
}

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
