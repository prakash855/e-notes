export const formatDate = (inputDate: string | undefined): string => {
  if (!inputDate) {
    // Handle the case where inputDate is undefined
    return "Invalid Date";
  }

  const date = new Date(inputDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "short",
    day: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);

  const formattedDate: string = formatter.format(date);

  return formattedDate.replace(/(\d+)(th|st|nd|rd)/, (_match, day) => {
    return day + (["th", "st", "nd", "rd"][parseInt(day) % 10] || "th");
  });
};
