import { z, ZodSchema } from 'zod';

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
  ) {
    super(message);
  }
}

export const safeAction = <T, U>(
  inputDto: ZodSchema<T>,
  outputDto: ZodSchema<U>,
  action: (data: T) => Promise<U>,
) => {
  return async function (input: z.infer<typeof inputDto>) {
    try {
      const { success, data: parsedInput, error } = inputDto.safeParse(input);

      if (!success)
        throw new ApiError(400, error?.errors[0].message || 'Bad Request');

      const output = await action(parsedInput);

      return outputDto.parse(output);
    } catch (error) {
      if (error instanceof ApiError) throw error;

      throw new ApiError(
        500,
        process.env.NODE_ENV === 'production'
          ? 'Internal Server Error'
          : (error as Error).message,
      );
    }
  };
};
