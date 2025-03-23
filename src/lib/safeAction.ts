"use server";
import { ZodSchema } from "zod";
import { auth } from "./auth";

export const safeAction = async <T, U>(
  action: (data: T) => Promise<U> | (() => Promise<U>), // Action with or without input
  inputDto?: ZodSchema<T>, // Optional schema for input validation
  outputDto?: ZodSchema<U>, // Schema for output validation
  isPublic: boolean = false,
) => {
  return async function (input?: T) {
    const ApiError = (await import("./ApiError")).default;
    try {
      let parsedInput: T | undefined = input;

      if (!isPublic) {
        const session = await auth();
        if (!session) {
          throw new ApiError(401, "Unauthorized");
        }
      }

      // Validate input if inputDto is provided
      if (inputDto && input) {
        //if (input === undefined) {
        //  throw new ApiError(400, "Input is required but missing");
        //}

        const { success, data, error } = inputDto.safeParse(input);

        if (!success) {
          throw new ApiError(400, error?.errors[0].message || "Bad Request");
        }

        parsedInput = data;
      }

      // Call action based on whether it expects an argument
      //const output = await (inputDto
      //  ? action(parsedInput as T)
      //  : (action as () => Promise<U>)());
      const output = await action(parsedInput as T);

      // Validate and return the output
      if (outputDto) {
        return outputDto.parse(output);
      }

      return output as U;
    } catch (error) {
      if (error instanceof ApiError) throw error;

      console.error(error);

      throw new ApiError(
        500,
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : (error as Error).message,
      );
    }
  };
};
