const convertSlugToChapter = (slug: string) => {
  return slug.replace("-", " ");
};
export default convertSlugToChapter;
