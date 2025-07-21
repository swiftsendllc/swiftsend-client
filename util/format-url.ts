import { configService } from './config';

export const formatUrl = (input: { host: string; path?: string; searchParams?: string }) => {
  try {
    const { host, path = '', searchParams = '' } = input;
    const safeUrl = new URL(host);
    safeUrl.pathname = path;
    safeUrl.search = searchParams;
    return safeUrl.toString();
  } catch (error) {
    console.log(`Error: ${error}\n formatting url: ${input}`);
    return configService.NEXT_PUBLIC_LOCAL_API_URL;
  }
};
