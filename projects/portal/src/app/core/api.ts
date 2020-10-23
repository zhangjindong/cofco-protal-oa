import { InjectionToken } from "@angular/core";

const api = {
  baseUrl: "/api",
  login: `/api/auth/login`,
};

export const API_CONFIG = new InjectionToken<string>("API_CONFIG");
export const APICONFIGPROVIDE = { provide: API_CONFIG, useValue: api };
