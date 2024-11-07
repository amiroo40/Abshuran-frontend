export const getSummary = (des, wordLimit) => {
  return des?.split(' ').slice(0, wordLimit).join(' ');
};
