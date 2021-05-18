export interface OriginalUrlResponse {
  ok: boolean;
  result: {
    code: string;
    url: string;
    password_protected: boolean;
    blocked: boolean;
    created: Date;
  };
}
