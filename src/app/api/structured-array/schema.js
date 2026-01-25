import z from "zod";

export const pokenmonSchema = z.object({
    name: z.string(),
    abilities: z.array(z.string())
})

export const pokenmonUiSchema = z.array(pokenmonSchema);