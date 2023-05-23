
import z from "zod";

const idValidation = z.object({
  id: z.string().max(30),
});

export default idValidation;
