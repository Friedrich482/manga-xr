const isValidChapterFormat = (input: string) => {
  const regex = /^chapter-\d+(\.\d+)?$/;
  return regex.test(input);
};
export default isValidChapterFormat;
