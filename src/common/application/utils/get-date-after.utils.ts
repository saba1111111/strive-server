export function getDateAfter(seconds: number): Date {
  return new Date(Date.now() + seconds * 1000);
}
