import { ThemeType, DropdownOption } from "../types";

export const USER_KEY = 'USER_KEY__reflection';
export const FLOATING_FOOTER_HEIGHT = 100;
export const SPACING = 70;
import i18n from "../i18n";

export const THEMES: DropdownOption[] = [{
  label: i18n.t('system'),
  value: 'system' as ThemeType
},
  {
    label: i18n.t('light'),
    value: 'light' as ThemeType
  },
  {
    label: i18n.t('dark'),
    value: 'dark' as ThemeType
  },];

export const LANGUAGES: DropdownOption[] = [{
  label: i18n.t('en'),
  value: 'en'
},
{
  label: i18n.t('cn'),
  value: 'cn'
  }, {
  label: i18n.t('hi'),
    value: 'hi'
  },
  {
    label: i18n.t('tl'),
    value: 'tl'
  },
{
  label: i18n.t('fr'),
  value: 'fr'
}];

export const NotificationSounds: DropdownOption[] = [{
  label: i18n.t('silent'),
  value: 'silent'
},{
  label: i18n.t('default'),
  value: 'loud_alarm_sound'
},{
  label: i18n.t('buzzer'),
  value: 'buzzer'
  }, {
  label: i18n.t('iphone_cat'),
  value: 'iphone_cat'
  }, {
  label: i18n.t('kill_bill_whistle'),
  value: 'kill_bill_whistle'
  }, {
  label: 'Merong nag txt sayo',
  value: 'merong_nag_txt_sayo'
  }, {
  label: i18n.t('minions_hello'),
  value: 'minions_hello'
  }, {
  label: i18n.t('morning_rooster'), 
  value: 'morning_rooster'
  }, {
  label: i18n.t('oppo_tune'), 
  value: 'oppo_tune'
  }, {
  label: i18n.t('phone_ringing'),
  value: 'phone_linging'
  }, {
  label: i18n.t('ring_ring'),
  value: 'ring_ring'
  }, {
  label: i18n.t('screaming_goat'),
  value: 'screaming_goat'
  }, {
  label: i18n.t('screaming'),
  value: 'screaming'
  },
  {
    label: 'Stella',
    value: 'stella'
  }, {
    label: i18n.t('serious_alarm'),
  value: 'serious_alarm'
  }, {
    label: i18n.t('sister_is_calling'),
  value: 'sister_is_calling'
  }, {
  label: 'Slim shady',
  value: 'slim_shady'
  }, {
  label: 'Tsismosa',
  value: 'tsismosa'
  }, {
    label: i18n.t('wake_up_heavy'),
  value: 'wake_the_fxx_up_hard'
  }, {
    label: i18n.t('gauaranteed_wake_up'), 
  value: 'wake_the_fxx_up'
  }, {
    label: i18n.t('wake_up'),
  value: 'wake_up'
  }
];

