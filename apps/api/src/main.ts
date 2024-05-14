import { Elysia, t } from "elysia";
import { bookController } from "./modules/book/book.controller";
import { swagger } from "@elysiajs/swagger";
import { bearer } from "@elysiajs/bearer";
import { userController } from "./modules/user/user.controller";

enum ServerStatus {
  OK = "OK",
  ERROR = "ERROR",
}

const app = new Elysia()
  .use(bookController)
  .use(userController)
  .get("/", () => ({ status: ServerStatus.OK }), {
    response: t.Object({ status: t.Enum(ServerStatus) }),
  })
  .use(
    swagger({
      documentation: {
        tags: [
          { name: "User", description: "User endpoints" },
          { name: "Book", description: "Book endpoints" },
        ],
      },
    })
  )
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

app
  .handle(new Request("http://localhost:4000/book/1"))
  .then((res) => res.json())
  .then(console.log);
