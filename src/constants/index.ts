import { ThemeType, DropdownOption } from "../types";

export const USER_KEY = 'USER_KEY__reflection';
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
  label: 'Default',
  value: '/path/to/default_sound'
},{
  label: 'Gentle stream',
  value: '/path/to/sound2'
},
  {
    label: 'Telephonica',
    value: '/path/to/sound3'
},{
    label: 'Morning Rooster',
    value: '/path/to/sound4'
}
];

