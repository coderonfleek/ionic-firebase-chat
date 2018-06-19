export interface User {
  id: string;
  email: string;
}

export interface Chat {
  id: string;
  message: string;
  pair: string;
  sender: string;
  time: string;
}
