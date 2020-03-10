import { Client } from "https://deno.land/x/postgres/mod.ts";

class Database {
	constructor() {
		this.connect();
	}

	async connect() {
		this.client = new Client({
			user: "postgres",
			database: "logrocket_deno",
			host: "localhost",
			password: "postgres",
			port: "5432"
		});

		await this.client.connect();
	}
}

export default new Database().client;
