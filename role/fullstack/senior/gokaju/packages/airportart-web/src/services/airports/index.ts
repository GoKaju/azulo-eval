import { AirportMapper } from "./mapper";
import { DEFAULT_USER, DEFAULT_PASSWORD } from "../../constants";

export type Airport = {
  id: string;
  name: string;
  code: string;
  state: string;
  country: string;
  operator: string;
};

export type AirportList = {
  airports: Airport[];
  total: number;
};

export interface Api {
  get: (path: string) => Promise<any>;
  post: (path: string, body: any) => Promise<any>;
}

export class AirportService {
  constructor(private readonly api: Api) {}

  async getAirports(sortField: string = "priorityOrder"): Promise<AirportList> {
    const token = await this.api.post("/auth/login", {
      email: DEFAULT_USER,
      password: DEFAULT_PASSWORD,
    });
    console.log(token.data);
    const response = await this.api.get(
      `/items/Airport?sort=${sortField}&fields=*,airportOperatorId.*,locationId.*&meta=*&limit=200&access_token=${token?.data?.access_token}`
    );

    return {
      airports: response.data.map(AirportMapper.map),
      total: response.meta.total_count,
    };
  }
}
