import { hasGap } from './Routine';

describe('Routine', () => {
  describe('hasGap', () => {
    test('should return false when lastCompletedDate is yesterday', () => {
      const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

      expect(hasGap({ lastCompletedDate: yesterday })).toBe(false);
    });

    test('should return true when lastCompletedDate is two days ago', () => {
      const twoDaysAgo = new Date(new Date().setDate(new Date().getDate() - 2));

      expect(hasGap({ lastCompletedDate: twoDaysAgo })).toBe(true);
    });

    test('should return false when lastCompletedDate is today', () => {
      const today = new Date();

      expect(hasGap({ lastCompletedDate: today })).toBe(false);
    });

    test('should handle future dates by returning false', () => {
      const futureDate = new Date(new Date().setDate(new Date().getDate() + 1));

      expect(hasGap({ lastCompletedDate: futureDate })).toBe(false);
    });

    test('should return false when lastCompletedDate is at the exact same moment', () => {
      const now = new Date();

      expect(hasGap({ lastCompletedDate: now })).toBe(false);
    });

    test('should return false when lastCompletedDate is one minute before midnight and current time is just after midnight', () => {
      const lastCompletedDate = new Date();
      lastCompletedDate.setHours(23, 59, 0, 0);
      const now = new Date();
      now.setDate(lastCompletedDate.getDate() + 1);
      now.setHours(0, 1, 0, 0);

      expect(hasGap({ lastCompletedDate })).toBe(false);
    });
  });
});
