export function isCoordinatePair(location: string): boolean {
  const coordinateRegex = /^((\-?|\+?)?\d+(\.\d+)?),((\-?|\+?)?\d+(\.\d+)?)/;
  return coordinateRegex.test(location);
}
