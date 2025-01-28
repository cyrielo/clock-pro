import notifee, { TimestampTrigger, TriggerType, AlarmType, AndroidImportance, AndroidVisibility, EventType } from '@notifee/react-native';
import { Alarm, Timer, Notification, Weekdays, TriggerPayload } from '../types';
import { COLORS } from '../constants/colors';
import { fromZonedTime } from 'date-fns-tz';
import { ClockStore, PreferencesStore } from '../store';
import { add, format, getTime } from 'date-fns';

export const ScheduleTimer = async (timer:Timer, timestamp:number) => {
  if (!PreferencesStore.preferences.notificationEnabled) { return; }
  const timerId = `${timer.id}_${timer.sound}`;
  const notificationTrigger: TimestampTrigger = {
    timestamp: timestamp,
    type: TriggerType.TIMESTAMP,
    alarmManager: {
      allowWhileIdle: true,
      type: AlarmType.SET_EXACT
    },
  };
  const notifciation: Notification = {
    id: timerId,
    color: timer.color,
    sound: timer.sound,
    title: `⏰ ${timer.label}`,
    description: `Timer is complete`
  };
  const payload:TriggerPayload = {
    notifciation,
    trigger: notificationTrigger,
  }
  await triggerNotification(payload);
};

export const CancelTimerNotification = async (timer:Timer) => {
  const timerId = `${timer.id}_${timer.sound}`;
  await notifee.cancelTriggerNotification(timerId);
  await notifee.cancelNotification(timerId);
  await notifee.deleteChannel(timerId);
}

export const DisplayNotification = async (timer:Timer) => {
  if (!PreferencesStore.preferences.notificationEnabled) { return; }
  await notifee.requestPermission();
  const channelId = `${timer.id}_${timer.sound}`;
  const notifciation: Notification = {
    id: timer.id,
    color: timer.color,
    sound: (timer.sound == 'silent') ? '' : timer.sound,
    title: `⏰ ${timer.label}`,
    description: `Timer is complete`
  };
  await notifee.createChannel({
    id: channelId,
    name: timer.id,
    sound: timer.sound,
    bypassDnd: true,
    importance: AndroidImportance.HIGH
  });
  await notifee.displayNotification({
    title: notifciation.title,
    body: notifciation.description,
    android: {
      channelId,
      ongoing: true,
      sound: notifciation.sound || 'default',
      color: notifciation.color || 'blue',
      importance: AndroidImportance.HIGH,
      lightUpScreen: true,
      loopSound: true,
      onlyAlertOnce: false,
      visibility: AndroidVisibility.PUBLIC,
      pressAction: { id: notifciation.id, },
    },
    ios: {
      interruptionLevel: 'timeSensitive',
      critical: true,
    },
  });
};

const ScheduleAlarmHelper = async (alarm:Alarm, channelId?:string) => {
  if (!PreferencesStore.preferences.notificationEnabled) { return; }
  const notificationTrigger: TimestampTrigger = {
    timestamp: alarm.timestamp,
    type: TriggerType.TIMESTAMP,
    alarmManager: {
      allowWhileIdle: true,
      type: AlarmType.SET_EXACT
    },
  };
  const notifciation: Notification = {
    id: alarm.id,
    color: COLORS.Light,
    sound: alarm.sound,
    title: `⏰ ${alarm.label}`,
    description: 'Alarm'
  };
  const payload:TriggerPayload = {
    channelId: channelId ? channelId : notifciation.id,
    notifciation,
    trigger: notificationTrigger,
    data: { alarm: JSON.stringify(alarm) }
  }
  await triggerNotification(payload);
}

const RescheduleAlarmInPlace = async (alarm:Alarm) => {
  const timezone = ClockStore.localTimezone;
  const date = fromZonedTime(new Date(alarm.timestamp), timezone);
  const newDate = add(date, { days: 7, });
  const newAlarm = Object.assign({}, alarm, {
    timestamp: newDate.getTime()
  });
  await ScheduleAlarmHelper(newAlarm);
}

export const ScheduleAlarm = async (alarm: Alarm) => {
  try {
    const timezone = ClockStore.localTimezone;
    const alarmNotificationId = `${alarm.id}_alarm_${alarm.sound}`; //adds alarm keyWord for alarmNotifications identity;
    const today = fromZonedTime(new Date(), timezone);
    // start alarm from nextDay if the datetime is in the past
    if (alarm.timestamp < getTime(today)) {
      const elapsedDate = fromZonedTime(new Date(alarm.timestamp), timezone);
      const newDate = add(today, { hours: 24 });
      newDate.setHours(elapsedDate.getHours());
      newDate.setMinutes(elapsedDate.getMinutes());
      newDate.setSeconds(elapsedDate.getSeconds());
      alarm.timestamp = getTime(newDate);
    }
    if (!alarm.weekdays.length) {
      await ScheduleAlarmHelper(Object.assign({}, alarm, { id: alarmNotificationId }), alarmNotificationId);
      return;
    }
    const weekdays =  alarm.weekdays; 
    if (weekdays.length) {
      const date = fromZonedTime(new Date(alarm.timestamp), timezone);
      const daysInWeek = 7;
      let match = 0;
      for (let i = 0; i < daysInWeek; i++) {
        const newDate = add(date, { days: i });
        const weekday = format(newDate, 'eeee').toLowerCase() as Weekdays;
        if (weekdays.includes(weekday)) {
          match += 1;
          const id = `${alarm.timestamp}_${weekday}_alarm`;
          const timestamp = newDate.getTime();
          const newAlarm = Object.assign({}, alarm, {timestamp, id});
          await notifee.cancelTriggerNotification(id);
          await ScheduleAlarmHelper(newAlarm, alarmNotificationId);
          // schedule Alarm for the week
          if (match === alarm.weekdays.length) {
            break;
          }
        }
      }
    }
  } catch(error ) {
    console.error('ScheduleAlarm::Error', error);
  }

};

export const CancelAlarmSchedule = async (alarm:Alarm, channelId:string) => {
  try {
    const notifciationIds = [`${alarm.id}_alarm`];
    for (let i = 0; i < alarm.weekdays.length; i++) {
      const weekday = alarm.weekdays[i];
      notifciationIds.push(`${alarm.timestamp}_${weekday}_alarm`);
    }
    await notifee.cancelAllNotifications(notifciationIds);
    await notifee.deleteChannel(channelId);
  } catch(error) {
    console.error('Error while CancelAlarmSchedule ', error);
  }
};

export const GetTriggerNotificationIds = async() => {
  return await notifee.getTriggerNotificationIds();
}

const triggerNotification = async (payload: TriggerPayload) => {
  if (!PreferencesStore.preferences.notificationEnabled) { return; }
  await notifee.requestPermission();
  try {
    const channelId = payload.channelId ? payload.channelId : payload.notifciation.id;
    await notifee.createChannel({
      id: channelId,
      name: payload.notifciation.id,
      sound: (payload.notifciation.sound == 'silent') ? '' : payload.notifciation.sound,
      bypassDnd: true,
      importance: AndroidImportance.HIGH
    }); 
    await notifee.createTriggerNotification({
      id: payload.notifciation.id,
      title: payload.notifciation.title,
      body: payload.notifciation.description,
      data: payload.data,
      android: {
        channelId,
        ongoing: true,
        sound: (payload.notifciation.sound == 'silent') ? '' : payload.notifciation.sound,
        color: payload.notifciation.color || 'blue',
        importance: AndroidImportance.HIGH,
        lightUpScreen: true,
        loopSound: true,
        onlyAlertOnce: false,
        visibility: AndroidVisibility.PUBLIC,
        pressAction: { id: payload.notifciation.id,  },
      },
      ios: {
        interruptionLevel: 'timeSensitive',
        critical: true,
      }
    }, payload.trigger);
  } catch (e) {
    console.error('notifciation error', e);
  }
}

notifee.onForegroundEvent(async ({ type, detail }) => {
  switch (type) {
    case EventType.UNKNOWN:
    case EventType.DISMISSED:
    case EventType.PRESS:
      if (detail.notification &&  detail.notification.id) {
        await notifee.cancelNotification(detail.notification.id);
        if (detail.notification.id.includes('_alarm')) {
          try {
            const data = (detail.notification.data?.alarm as any) as string;
            const alarm = (JSON.parse(data)) || {} as Alarm;
            if (alarm.shouldRepeat) {
              await RescheduleAlarmInPlace(alarm);
            }
          } catch(error) {
            console.error('Failed to RescheduleAlarmInPlace', error);
          }
        }
      }
      break;
  }
});
