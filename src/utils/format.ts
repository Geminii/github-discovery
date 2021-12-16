import { formatDistance } from "date-fns";

export const formatDistanceFromNow = (date: string): string => {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true
  });
};