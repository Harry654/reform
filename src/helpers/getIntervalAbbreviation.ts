export const getIntervalAbbreviation = (interval: string): string => {
  const intervalAbbreviations: { [key: string]: string } = {
    monthly: "/mo",
    yearly: "/yr",
    weekly: "/wk",
    daily: "/day",
  };

  return intervalAbbreviations[interval] || "";
};
