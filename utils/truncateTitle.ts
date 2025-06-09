const truncateTitle = (title: string, maxLength: number): string => {
  return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
};

export default truncateTitle;
