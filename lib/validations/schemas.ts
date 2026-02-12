import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: z.string().optional().default("TODO"),
    dueDate: z.string().optional().nullable(),
});

export const noteSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().optional(),
});

export const bookmarkSchema = z.object({
    title: z.string().min(1, "Title is required"),
    url: z.string().url("Invalid URL"),
});

export const pipelineSchema = z.object({
    title: z.string().min(1, "Title is required"),
});

export const pipelineStageSchema = z.object({
    name: z.string().min(1, "Stage name is required"),
    pipelineId: z.string(),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
