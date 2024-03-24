export const config = {
  socketServerUrl:
    process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_SOCKET_SERVER_URL_PROD! : process.env.NEXT_PUBLIC_SOCKET_SERVER_URL_DEV!,
};
