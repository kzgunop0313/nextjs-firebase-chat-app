const buildSuffix = (url?: {
  query?: Record<string, string>;
  hash?: string;
}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = query ? `?${new URLSearchParams(query)}` : '';
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
  chat: {
    $url: (url?: { hash?: string }) => ({
      pathname: '/chat' as const,
      hash: url?.hash,
      path: `/chat${buildSuffix(url)}`,
    }),
  },
  mypage: {
    $url: (url?: { hash?: string }) => ({
      pathname: '/mypage' as const,
      hash: url?.hash,
      path: `/mypage${buildSuffix(url)}`,
    }),
  },
  signin: {
    $url: (url?: { hash?: string }) => ({
      pathname: '/signin' as const,
      hash: url?.hash,
      path: `/signin${buildSuffix(url)}`,
    }),
  },
  signup: {
    $url: (url?: { hash?: string }) => ({
      pathname: '/signup' as const,
      hash: url?.hash,
      path: `/signup${buildSuffix(url)}`,
    }),
  },
  $url: (url?: { hash?: string }) => ({
    pathname: '/' as const,
    hash: url?.hash,
    path: `/${buildSuffix(url)}`,
  }),
};

export type PagesPath = typeof pagesPath;
