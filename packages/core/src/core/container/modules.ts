import { Container } from "inversify";
import { INVERSITY_TYPES } from "..";
import { ILoggerFactory, LoggerPino } from "../loggers";

/**
 * Core module providing default logger binding
 */
export const addCoreModule = (container: Container): Container => {
  // Bind default logger factory
  container.isBound(INVERSITY_TYPES.LoggerFactory) ||
    container
      .bind<ILoggerFactory>(INVERSITY_TYPES.LoggerFactory)
      .toConstantValue(new LoggerPino("server", "debug"));
  return container;
};
