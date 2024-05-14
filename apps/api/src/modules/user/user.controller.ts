import { Elysia, t } from "elysia";

export const userController = new Elysia().group("/user", (app) =>
  app.get("", () => "Get all users", { tags: ["User"] })
);
