export type User = {
  user_name: string,
  user_email: string,
  user_password: string,
  user_mobile: string,
  user_privacyPolicy: boolean,
  user_advertisePolicy: boolean,
  user_date: Date,
};

// NOT DEPRECATED!!
// 차후에 자유게시판 생성 시 해당 타입을 사용할 예정
export type Article = {
  // [후보 1] Article ID 를 직접 생성
  // [후보 2] MongoDB가 자체적으로 생성하는 id를 Article ID로 사용
  article_id: number,
  article_title: string,
  article_author: string, // user_email
  article_content: string,
  article_date: Date,
};

// 문의게시판용 타입 선언
export type Board = {
  board_id: number,
  board_title: string,
  board_author: string,
  board_content: string,
  board_date: string,
  board_routeNm: string,
  board_svarNm: string,
};