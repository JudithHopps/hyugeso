export type HTTPMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

export type SigninData = {
  email: string;
  password: string;
  loginState: any;
};

export type SignupData = {
  name: string;
  email: string;
  password: string;
  mobile: string;
  nickname: string;
  privacyPolicy: boolean;
  advertisePolicy: boolean;
};

export type FindIdData = {
  name: string;
  mobile: string;
};

export type HighwayData = {
  svarCd: string;
  routeNm: string;
  svarNm: string;
};

export type BoardData = {
  id: string;
  title: string;
  author: string;
  content: string;
  date: string;
  routeNm: string;
  svarNm: string;
};

export type HiwaySvarInfo = {
  routeCd: string;
  svarAddr: string;
  routeNm: string;
  svarCd: string;
  svarNm: string;
  hdqrCd: string;
  hdqrNm: string;
  mtnofCd: string;
  mtnofNm: string;
  svarGsstClssCd: string;
  svarGsstClssNm: string;
  gudClssCd: string;
  gudClssNm: string;
  pstnoCd: string;
  cocrPrkgTrcn: string;
  fscarPrkgTrcn: string;
  dspnPrkgTrcn: string;
  bsopAdtnlFcltCd: string;
  rprsTelNo: string;
};

export type tokenData = {
  token: string;
};