export const getParts = (option: string, searchString: string) => {
  const indexOfMatch = option.toLowerCase().indexOf(searchString.toLowerCase());
  const firstPart = option.substring(0, indexOfMatch);
  const middlePart = option.substring(indexOfMatch, indexOfMatch + searchString.length);
  const lastPart = option.substring(indexOfMatch + searchString.length)

  return [firstPart, middlePart, lastPart];
}
