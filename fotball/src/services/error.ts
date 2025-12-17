import axios from "axios";

export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const maybeMessage = (err.response?.data as any)?.message;
    return maybeMessage ?? err.message ?? "Request failed";
  }

  if (err instanceof Error) return err.message;

  return "Something went wrong";
}
