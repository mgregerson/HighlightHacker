export function generateTimestamp(date: Date) {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    if (seconds === 1) {
      return `${seconds} second ago`;
    }
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    if (minutes === 1) {
      return `${minutes} minute ago`;
    }
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    if (hours === 1) {
      return `${hours} hour ago`;
    }
    return `${hours} hours ago`;
  } else {
    if (days === 1) {
      return `${days} day ago`;
    }
    return `${days} days ago`;
  }
}
