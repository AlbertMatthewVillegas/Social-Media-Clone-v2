function getTimeElapsed(timestampString: string, format: 'letter' | 'phrase'): string {
    const pastDate = new Date(timestampString);
    const currentDate = new Date();

    const diffMs = currentDate.getTime() - pastDate.getTime();

    if (diffMs < 0) {
        return "Timestamp is in the future";
    }

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    const remSeconds = seconds % 60;
    const remMinutes = minutes % 60;
    const remHours = hours % 24;

    if (format === 'phrase') {
        if (weeks > 4) {
            return `${pastDate.toDateString()}`;
        } else if (days >= 7) {
            return `${days} ${days === 1 ? 'week' : 'weeks'} ago`;
        } else if (days > 0) {
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        } else if (remHours > 0) {
            return `${remHours} ${remHours === 1 ? 'hour' : 'hours'} ago`;
        } else if (remMinutes > 0) {
            return `${remMinutes} ${remMinutes === 1 ? 'minute' : 'minutes'} ago`;
        } else {
            return `${remSeconds} ${remSeconds === 1 ? 'second' : 'seconds'} ago`;
        }
    }

    if (format === 'letter') {
        if (weeks > 4) {
            return `${pastDate.toDateString()}`;
        } else if (days >= 7) {
            return `${days}w`;
        } else if (days > 0) {
            return `${days}d`;
        } else if (remHours > 0) {
            return `${remHours}h`;
        } else if (remMinutes > 0) {
            return `${remMinutes}m`;
        } else {
            return `${remSeconds}s`;
        }
    }

    return ''
}

export default getTimeElapsed