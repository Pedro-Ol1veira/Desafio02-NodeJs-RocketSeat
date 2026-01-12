import { app } from "./app.js";

app.listen({
    port: 3333
}).then(() => {
    console.log("Server HTTP rodando");
})