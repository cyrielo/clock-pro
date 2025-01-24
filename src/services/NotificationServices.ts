import notifee, { TimestampTrigger, TriggerType, AlarmType, AndroidImportance, AndroidVisibility, EventType } from '@notifee/react-native';
import { Alarm, Timer, Notification } from '../types';
import { COLORS } from '../constants/colors';

export const scheduleTimer = async (timer:Timer, timestamp:number) => {
  const notificationTrigger: TimestampTrigger = {
    timestamp: timestamp,
    type: TriggerType.TIMESTAMP,
    alarmManager: {
      allowWhileIdle: true,
      type: AlarmType.SET_EXACT
    },
  };

  const notifciation: Notification = {
    id: timer.id,
    color: timer.color,
    sound: timer.sound,
    title: `⏰ ${timer.label}`,
    description: `Timer is complete`
  };
  await triggerNotification(notificationTrigger, notifciation);
};

export const cancelNotificationSchedule = async (id:string) => {
  return await notifee.deleteChannel(id);
}

export const scheduleAlarm = async (alarm: Alarm) => {
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
  await triggerNotification(notificationTrigger, notifciation);
};

export const getTriggerNotificationIds = async() => {
  return await notifee.getTriggerNotificationIds();
}

const triggerNotification = async (trigger:TimestampTrigger, notifciation:Notification) => {
  await notifee.requestPermission();
  try {
    await notifee.createChannel({
      id: notifciation.id,
      name: notifciation.id,
      sound: notifciation.sound,
      bypassDnd: true,
      importance: AndroidImportance.HIGH
    }); 
    await notifee.createTriggerNotification({
      title: notifciation.title,
      body: notifciation.description,
      android: {
        channelId: notifciation.id,
        ongoing: true,
        sound: notifciation.sound || 'default',
        color: notifciation.color || 'blue',
        importance: AndroidImportance.HIGH,
        lightUpScreen: true,
        loopSound: true,
        onlyAlertOnce: false,
        visibility: AndroidVisibility.PUBLIC,
        pressAction: { id: notifciation.id,  },
      },
    }, trigger);
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
        await cancelNotificationSchedule(detail.notification.id);
      }
      break;
  }
});
