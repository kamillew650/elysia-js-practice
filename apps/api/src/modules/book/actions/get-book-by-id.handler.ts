export function getBookByIdHandler(id: string): {
  message: string;
} {
  return { message: `Get book with param: ${id}` };
}
