"use client";

// This component exists because the title of the document needs to be updated after the data fetching
// but there is currently a nextjs error that makes the metadata.title not update the title properly
// keep an eye on a potential fix
const ClientTitleUpdater = ({ title }: { title: string }) => {
  if (typeof document !== "undefined") {
    document.title = `${title} | MangaXR`;
  }
  return <></>;
};

export default ClientTitleUpdater;
