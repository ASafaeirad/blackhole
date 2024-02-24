export const palette = {
  flare: {
    100: 'lch(65 60.36 26.96 / 10%)',
    600: 'lch(65 60.36 26.96)',
  },
  sky: {
    100: 'lch(82.74% 38.45 190.82 / 10%)',
    600: 'lch(82.74% 38.45 190.82)',
  },
  green: {
    100: 'lch(94.04% 38.03 147.88 / 10%)',
    600: 'lch(94.04% 38.03 147.88)',
  },
  gray: {
    100: 'lch(93.75% 0 0)',
    300: 'lch(75.51% 0 0)',
    400: 'lch(65.87% 0 0)',
    600: 'lch(30.59% 0 0)',
    700: 'lch(20.79% 0 0)',
    800: 'lch(15.16% 0 0)',
    900: 'lch(11.76% 0 0)',
  },
  tint: {
    10: 'lch(100 0 0 / 0.1)',
    30: 'lch(100 0 0 / 0.3)',
    50: 'lch(100 0 0 / 0.4)',
    80: 'lch(100 0 0 / 0.5)',
  },
};

export const colors = {
  text: {
    'primary': palette.gray[100],
    'alternative': palette.gray[900],
    'muted': palette.tint[50],
    'on-cta': palette.gray[900],
    'cta': palette.green[600],
    'success': palette.green[600],
    'danger': palette.green[600],
  },
  bg: {
    'primary': palette.gray[900],
    'elevated': palette.gray[800],
    'alternative': palette.gray[100],
    'subtle': palette.tint[10],
    'cta': palette.gray[700],
    'cta-subtle': palette.sky[100],
    'danger': palette.flare[600],
    'danger-subtle': palette.flare[100],
    'success': palette.green[600],
    'success-subtle': palette.green[100],
  },
  border: {
    active: palette.gray[100],
    idle: palette.tint[10],
    cyan: palette.sky[600],
    green: palette.green[600],
    red: palette.flare[600],
  },
  icon: {
    primary: palette.gray[100],
    muted: palette.gray[400],
  },
  shadow: {},
};

type ToString<T> = T extends string ? T : '';
type MergePath<T extends Record<string, Record<string, string>>> = {
  [K in keyof T]: T[K] extends Record<string, string>
    ? T[K] extends infer X
      ? { [K2 in keyof X as `--${ToString<K>}-${ToString<K2>}`]: string }
      : unknown
    : T;
};

type FlattenProperties<T> = T extends Record<string, infer U> ? U : never;
type MergeUnion<T> = (T extends any ? (k: T) => void : never) extends (
  k: infer U,
) => void
  ? U
  : never;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {}; // eslint-disable-line @typescript-eslint/ban-types

type ColorVars = Prettify<
  MergeUnion<FlattenProperties<MergePath<typeof colors>>>
>;

export const colorVars: ColorVars = Object.entries(colors).reduce<any>(
  (acc, [key, value]) => {
    const obj = Object.entries(value).reduce<any>((acc, [k2, v2]) => {
      acc[`--${key}-${k2}`] = v2;
      return acc;
    }, {});
    return { ...acc, ...obj };
  },
  {},
);
