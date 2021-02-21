import { SPACES } from '@/constants/sizes.constants';

export type SizeValues = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
export type SizesKeys = keyof typeof SPACES;

export enum FontFamilies {
  Montserrat = 'Montserrat',
  MontserratBold = 'MontserratBold',
  MontserratLight = 'MontserratLight',
}
