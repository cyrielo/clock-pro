import { ThemeType, DropdownOption } from "../types";

export const USER_KEY = 'USER_KEY__reflection';
export const FLOATING_FOOTER_HEIGHT = 100;
export const SPACING = 70;
export const THEMES: DropdownOption[] = [{
  label: 'System',
  value: 'system' as ThemeType
},
  {
    label: 'Light',
    value: 'light' as ThemeType
  },
  {
    label: 'Dark',
    value: 'dark' as ThemeType
  },];
export const LANGUAGES: DropdownOption[] = [{
  label: 'English',
  value: 'en'
},
{
  label: 'Chinese',
  value: 'ch'
  }, {
    label: 'Hindi',
    value: 'in'
  },
  {
    label: 'Tagalog',
    value: 'pe'
  },
{
  label: 'French',
  value: 'fr'
}];

export const NotificationSounds: DropdownOption[] = [{
  label: 'Silent',
  value: 'silent'
},{
  label: 'Default',
  value: 'loud_alarm_sound'
},{
  label: 'Buzzer',
  value: 'buzzer'
  }, {
  label: 'iPhone Cat',
  value: 'iphone_cat'
  }, {
  label: 'Kill bill whistle',
  value: 'kill_bill_whistle'
  }, {
  label: 'Merong nag txt sayo',
  value: 'merong_nag_txt_sayo'
  }, {
  label: 'Minions hello',
  value: 'minions_hello'
  }, {
  label: 'Morning rooster',
  value: 'morning_rooster'
  }, {
  label: 'Oppo tune',
  value: 'oppo_tune'
  }, {
  label: 'Phone linging',
  value: 'phone_linging'
  }, {
  label: 'Ring ring',
  value: 'ring_ring'
  }, {
  label: 'Screaming goat',
  value: 'screaming_goat'
  }, {
  label: 'Screaming',
  value: 'screaming'
  }, {
  label: 'Serious alarm',
  value: 'serious_alarm'
  }, {
  label: 'Sister is calling',
  value: 'sister_is_calling'
  }, {
  label: 'Slim shady',
  value: 'slim_shady'
  }, {
  label: 'Tsismosa',
  value: 'tsismosa'
  }, {
  label: 'Wake the f** up hard',
  value: 'wake_the_f**_up_hard'
  }, {
  label: 'Wake the f** up',
  value: 'wake_the_f**_up'
  }, {
  label: 'Wake up',
  value: 'wake_up'
  }
];

