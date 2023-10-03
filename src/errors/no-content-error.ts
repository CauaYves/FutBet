import { ApplicationError } from "../../protocols";

export function noContentError(message: string): ApplicationError {
  return {
    name: "No content",
    message
  }
}