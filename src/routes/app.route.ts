import { Application, NextFunction, Request, Response } from "express";

import HealthCheckRoute from '../module/health/health.route';

const appModuleRoute = (app: Application) => {
  const moduleRoute = () => [
    new HealthCheckRoute()
  ];

  moduleRoute().forEach((appRoute) => {
    app.use("/api", appRoute.router);
  });
}

const appDefaultRoute = (app: Application) => {
  app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
      'errorName': 'NOT FOUND',
      'errorMessage': 'The requested resource not found.'
    })
  });
}

const AppRoute = (app: Application) => {
  appModuleRoute(app);
  appDefaultRoute(app);
}

export default AppRoute;
