import { TSeverityEnum } from 'src/types';
import { CardColorEnum } from '../types/card-color-enum';

const severityColorVariants: Record<TSeverityEnum, CardColorEnum> = {
  MEDIUM: CardColorEnum.warning,
  CRITICAL: CardColorEnum.error,
  HIGH: CardColorEnum.warning,
  LOW: CardColorEnum.success,
};

export const getSeverityColor = (orderStatus: TSeverityEnum): CardColorEnum => {
  const cardColor: CardColorEnum = severityColorVariants[orderStatus];
  return cardColor;
};
