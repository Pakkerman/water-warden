export function padTime(input: string | number): string {
  return input.toString().padStart(2, "0");
}
