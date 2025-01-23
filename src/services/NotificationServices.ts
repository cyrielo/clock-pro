import notifee, { TimestampTrigger, TriggerType, AlarmType, AndroidImportance } from '@notifee/react-native';
import { Timer } from '../types';

export const scheduleTimer = async (timer:Timer, timestamp:number) => {


  await notifee.requestPermission();

  console.log('timer->', timer);
  const notificationTrigger:TimestampTrigger = {
    timestamp: timestamp,
    type: TriggerType.TIMESTAMP,
    alarmManager: {
      allowWhileIdle: true,
      type: AlarmType.SET_EXACT
    },
  };

  console.log('notificationTrigger', notificationTrigger);
  console.log('sound', timer.sound);
  try {
    await notifee.deleteChannel(timer.sound);
    await notifee.createChannel({
      id: timer.sound,
      name: timer.sound,
      sound: timer.sound,
      importance: AndroidImportance.HIGH
    });

    // await notifee.displayNotification({
    //   title: "⏰ Timer Done",
    //   body: timer.label ? `'${timer.label}' has completed` : '',
    //   android: {
    //     channelId: timer.sound,
    //     ongoing: true,
    //     pressAction: { id: 'stop-alarm' }, // Action to stop the alarm
    //   },
    // });
    const triggerId = await notifee.createTriggerNotification({
      title: "⏰ Timer Done",
      body: timer.label? `'${timer.label}' has completed` : '',
      android: {
        channelId: timer.sound,
        ongoing:true,
        sound: timer.sound || 'default',
        color: timer.color || 'blue',
      },

    }, notificationTrigger);
    console.log('created:: -> ' );
  } catch(e) {
    console.log('notifciation error', e);
  }
};

