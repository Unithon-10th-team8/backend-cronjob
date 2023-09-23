export const baseMailTemplate = {
  text: '{user_name}님 안녕하세요!\n오늘의 일정을 안내해드립니다.\n{user_name}님의 오늘 하루도 저희 까미가 응원하겠습니다!\n{date} 일정 안내\n{calendar_data_text}\n더보기 : {calendar_data_url}\n\n',
  html: '<p>{user_name}님 안녕하세요!</p><p>오늘의 일정을 안내해드립니다.</p><p>{user_name}님의 오늘 하루도 저희 까미가 응원하겠습니다!</p><p>{date} 일정 안내</p><p>{calendar_data_html}</p><a href="{calendar_data_url}" _target="blank"><p>더보기</p></a><p></p>',
};
