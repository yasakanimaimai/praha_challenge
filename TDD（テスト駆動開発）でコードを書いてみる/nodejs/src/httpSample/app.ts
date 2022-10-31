import * as http from "http";
import { port } from "./config"; // 自前で作成したモジュールを読み込む


const server = http.createServer(
  (request, response) => {
    response.end("hello");
  }
);

server.listen(port);

console.log(`http://localhost:${port} へアクセスください`);