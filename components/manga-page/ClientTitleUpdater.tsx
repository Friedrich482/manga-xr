"use client";
const ClientTitleUpdater = ({ title }: { title: string }) => {
  document.title = `${title} | MangaXR`;
  return <></>;
};

export default ClientTitleUpdater;
