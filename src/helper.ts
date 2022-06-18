import type { IncomingMessage } from 'http';

export const parseId = (endpoint: any): string => {
  const args = endpoint ? endpoint.split('/') : [];
  if (args.length === 4) {
    return args[3]!;
  }
  return '';
};

export const stringValidCheck = (someString: any): boolean =>  typeof someString === 'string';

export const ageValidCheck = (age: number): boolean => typeof age === 'number';

export const hobbyValidCheck = (hobbies: any[]): boolean => hobbies.length > 0 && hobbies.every((hobby) => stringValidCheck(hobby));

export const parseRequestBody = (
  req: IncomingMessage
): Promise<any> => {
  return new Promise((resolve) => {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', async () => {
        resolve(JSON.parse(body) as any);
      });
    } catch (error) {
      throw new Error();
    }
  });
};
