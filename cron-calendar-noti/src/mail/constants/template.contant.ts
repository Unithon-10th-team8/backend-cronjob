export const baseMailTemplate = {
  text: '{user_name}님 안녕하세요!\n{contact_name}님과의 {event_name} 일정을 안내해드립니다.\n{calendar_data_text}\n\n오늘도 {user_name}님의 하루를 응원합니다!\n더보기 : {calendar_data_url}\n\n',
  html: '<p>{user_name}님 안녕하세요!</p><p>{contact_name}님과의 {event_name} 일정을 안내해드립니다.</p><p>{calendar_data_html}</p><p>오늘도 {user_name}님의 하루를 응원합니다!</p><a href="{calendar_data_url}" _target="blank"><p>더보기</p></a>',
};
