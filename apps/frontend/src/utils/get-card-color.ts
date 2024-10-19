export function getCardColor(index: number): string {
  const colors = [
    '#659dcc',
    '#91AABE',
    '#b4cdd1',
    '#B0DDE4',
    '#E8DFE0',
    '#8D9B6A',
    '#6DAFFE',
    '#AECF80',
  ];
  const colorCode = colors[index] || colors[index % colors.length];
  return colorCode;
}
