import moment from 'moment';

export const convertBirthdayFormat = (birthday: string): string => {
  // Parse the birthday string (e.g., "Oct, 10" or "Mar, 15")
  const parsedDate = moment(birthday, 'MMM, DD');

  // Format to "MM-DD" (e.g., "10-10", "03-15")
  return parsedDate.format('MM-DD');
};

export const reverseBirthdayFormat = (birthday: string): string => {
  // Parse the birthday string (e.g., "10-22" or "03-15")
  const parsedDate = moment(birthday, 'MM-DD');

  // Format to "MMM, DD" (e.g., "Oct, 22", "Mar, 15")
  return parsedDate.format('MMM, DD');
};
