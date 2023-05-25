import { networkInterfaces } from "os";
import { createConnection } from "mysql2";

const setConnection = () => {
  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  let currentIP = results["en0"] || results["eth0"];
  currentIP = currentIP.toString();

  let connection;
  let PORT;
  //В зависимости от IP адреса необходимо подключаться к различным портам и с разными настройками базы данных
  switch (currentIP) {
    case "192.168.0.19":
      console.log("Это localhost");
      PORT = 3005;
      //Подключение к localhost
      connection = createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "correspondance",
      });
      break;

    case "10.205.24.14": // поправить
      console.log("Это sodfu");
      PORT = 3005;
      //Подключение к базе данных sodfu
      connection = createConnection({
        host: "10.205.24.14",
        port: 3306,
        user: "inventorydb",
        database: "correspondance",
        password: "",
      });
      break;

    default:
      PORT = 3005;
      //Подключение к localhost
      connection = createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "correspondance",
      });
      break;
  }

  connection.connect(function (error) {
    if (error) {
      return console.error("Ошибка " + error.message);
    } else {
      console.log("Подключение прошло успешно");
    }
  });
  return {PORT, connection}
};

export default setConnection;
