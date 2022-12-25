import "reflect-metadata"
import {config} from "./environments/config";
import {DataSource} from "typeorm";
import {CreateAccountTable1671625149385} from "./migrations/1671625149385-CreateAccountTable";

const AppDataSource = new DataSource({
  ...config.database,
  type: "postgres",
  migrations: [CreateAccountTable1671625149385]
})
export default AppDataSource
