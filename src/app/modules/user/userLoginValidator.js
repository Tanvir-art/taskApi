// const { z } = require('zod');
import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string({
      invalid_type_error: 'email must be string',
      required_error: 'email is required',
    }).email('Invalid email format'),
    password: z.string({
      invalid_type_error: 'password must be string',
      required_error: 'password is required',
    }),
  }),
});
