export const convertToIdFormat = (name) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[.,']/g, '')
    .replace(/[^a-z0-9-]/g, '');
}