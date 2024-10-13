import { TSeverityEnum } from 'src/types';
import { ColorEnum } from '../types/color-enum';

const severityColorVariants: Record<TSeverityEnum, ColorEnum> = {
  MEDIUM: ColorEnum.warning,
  CRITICAL: ColorEnum.error,
  HIGH: ColorEnum.warning,
  LOW: ColorEnum.success,
};

export const getSeverityColor = (orderStatus: TSeverityEnum): ColorEnum => {
  const cardColor: ColorEnum = severityColorVariants[orderStatus];
  return cardColor;
};
