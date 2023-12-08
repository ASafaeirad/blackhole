import type { Logger, LogLevel } from './Debug';
import { Debug, DebugScopes } from './Debug';

let stubLogger: Logger;
const style = 'style';

const createDebug = (logLevel: LogLevel, scopes: string[] = ['Test']) =>
  new Debug(stubLogger, logLevel, scopes, style);

describe('Debug', () => {
  beforeEach(() => {
    stubLogger = {
      log: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };
  });

  describe('trace', () => {
    it('should call internal log function when log level is trace', () => {
      const debug = createDebug('trace');
      debug.trace('Test', 1, 2);

      expect(stubLogger.log).toHaveBeenCalledWith('%cTest', style, 1, 2);
    });

    it('should NOT call internal log function when log level is info', () => {
      const debug = createDebug('info');
      debug.trace('Test', 1, 2);

      expect(stubLogger.log).not.toHaveBeenCalled();
    });

    it('should NOT call internal log function when log level is warn', () => {
      const debug = createDebug('warn');
      debug.trace('Test', 1, 2);

      expect(stubLogger.log).not.toHaveBeenCalled();
    });

    it('should NOT call internal log function when log level is error', () => {
      const debug = createDebug('error');
      debug.trace('Test', 1, 2);

      expect(stubLogger.log).not.toHaveBeenCalled();
    });

    it('should NOT call internal log function when log level is silent', () => {
      const debug = createDebug('silent');
      debug.trace('Test', 1, 2);

      expect(stubLogger.log).not.toHaveBeenCalled();
    });

    it('should call internal log function when scope is included', () => {
      const debug = createDebug('trace', ['Test2', 'Test3']);
      debug.trace('Test2', 1, 2);

      expect(stubLogger.log).toHaveBeenCalledWith('%cTest2', style, 1, 2);
    });

    it('should NOT call internal log function when scope is not included', () => {
      const debug = createDebug('trace', ['Test', 'Test3']);
      debug.trace('Test2', 1, 2);

      expect(stubLogger.log).not.toHaveBeenCalled();
    });

    it('should call internal log function when the scope is All even if it is not included', () => {
      const debug = createDebug('trace', ['Test', 'Test3']);
      debug.trace(DebugScopes.All, 1, 2);

      expect(stubLogger.log).toHaveBeenCalledWith(
        `%c${DebugScopes.All}`,
        style,
        1,
        2,
      );
    });
  });

  describe('log', () => {
    it('should call internal log function when log level is trace', () => {
      const debug = createDebug('trace');
      debug.log('Test', 1, 2);

      expect(stubLogger.log).toHaveBeenCalledWith('%cTest', style, 1, 2);
    });

    it('should call internal log function when log level is info', () => {
      const debug = createDebug('info');
      debug.log('Test', 1, 2);

      expect(stubLogger.log).toHaveBeenCalledWith('%cTest', style, 1, 2);
    });

    it('should NOT call internal log function when log level is warn', () => {
      const debug = createDebug('warn');
      debug.log('Test', 1, 2);

      expect(stubLogger.log).not.toHaveBeenCalled();
    });

    it('should NOT call internal log function when log level is error', () => {
      const debug = createDebug('error');
      debug.log('Test', 1, 2);

      expect(stubLogger.log).not.toHaveBeenCalled();
    });

    it('should NOT call internal log function when log level is silent', () => {
      const debug = createDebug('silent');
      debug.log('Test', 1, 2);

      expect(stubLogger.log).not.toHaveBeenCalled();
    });

    it('should call internal log function when scope is included', () => {
      const debug = createDebug('trace', ['Test2', 'Test3']);
      debug.log('Test2', 1, 2);

      expect(stubLogger.log).toHaveBeenCalledWith('%cTest2', style, 1, 2);
    });

    it('should NOT call internal log function when scope is not included', () => {
      const debug = createDebug('trace', ['Test', 'Test3']);
      debug.log('Test2', 1, 2);

      expect(stubLogger.log).not.toHaveBeenCalled();
    });

    it('should call internal log function when the scope is All even if it is not included', () => {
      const debug = createDebug('trace', ['Test', 'Test3']);
      debug.log(DebugScopes.All, 1, 2);

      expect(stubLogger.log).toHaveBeenCalledWith(
        `%c${DebugScopes.All}`,
        style,
        1,
        2,
      );
    });
  });

  describe('warn', () => {
    it('should call internal log function when log level is trace', () => {
      const debug = createDebug('trace');
      debug.warn(1, 2);

      expect(stubLogger.warn).toHaveBeenCalledWith(1, 2);
    });

    it('should NOT call internal log function when log level is info', () => {
      const debug = createDebug('info');
      debug.warn(1, 2);

      expect(stubLogger.warn).toHaveBeenCalledWith(1, 2);
    });

    it('should NOT call internal log function when log level is warn', () => {
      const debug = createDebug('warn');
      debug.warn(1, 2);

      expect(stubLogger.warn).toHaveBeenCalledWith(1, 2);
    });

    it('should NOT call internal log function when log level is error', () => {
      const debug = createDebug('error');
      debug.warn(1, 2);

      expect(stubLogger.warn).not.toHaveBeenCalled();
    });

    it('should NOT call internal log function when log level is silent', () => {
      const debug = createDebug('silent');
      debug.warn(1, 2);

      expect(stubLogger.warn).not.toHaveBeenCalled();
    });
  });

  describe('error', () => {
    it('should call internal log function when log level is trace', () => {
      const debug = createDebug('trace');
      debug.error(1, 2);

      expect(stubLogger.error).toHaveBeenCalledWith(1, 2);
    });

    it('should NOT call internal log function when log level is info', () => {
      const debug = createDebug('info');
      debug.error(1, 2);

      expect(stubLogger.error).toHaveBeenCalledWith(1, 2);
    });

    it('should NOT call internal log function when log level is warn', () => {
      const debug = createDebug('warn');
      debug.error(1, 2);

      expect(stubLogger.error).toHaveBeenCalledWith(1, 2);
    });

    it('should NOT call internal log function when log level is error', () => {
      const debug = createDebug('error');
      debug.error(1, 2);

      expect(stubLogger.error).toHaveBeenCalledWith(1, 2);
    });

    it('should NOT call internal log function when log level is silent', () => {
      const debug = createDebug('silent');
      debug.error(1, 2);

      expect(stubLogger.error).not.toHaveBeenCalled();
    });
  });
});
