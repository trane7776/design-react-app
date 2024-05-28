import { swatch, fileIcon, ai, logoShirt, stylishShirt } from '../assets';

export const EditorTabs = [
  {
    name: 'colorpicker',
    icon: swatch,
    displayName: 'Пипетка',
  },
  {
    name: 'filepicker',
    icon: fileIcon,
    displayName: 'Картинка',
  },
  {
    name: 'aipicker',
    icon: ai,
    displayName: 'ИИ генератор',
  },
  {
    name: 'svgeditor',
    icon: ai,
    displayName: 'Конструктор',
  },
];

export const FilterTabs = [
  {
    name: 'logoShirt',
    icon: logoShirt,
    displayName: 'Лого',
  },
  {
    name: 'stylishShirt',
    icon: stylishShirt,
    displayName: 'Текстура',
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: 'logoDecal',
    filterTab: 'logoShirt',
  },
  full: {
    stateProperty: 'fullDecal',
    filterTab: 'stylishShirt',
  },
};
