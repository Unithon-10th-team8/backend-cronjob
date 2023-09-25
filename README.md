# backend-cronjob
- Cronjob으로 동작해야 하는 작업들을 NestJS Standalone 앱으로 구현
- 실제 Cronjob은 쿠버네티스 클러스터 내에서 동작
- 중간에 큐를 두고 동작해야 하는 작업들이 있긴 한데, 일단 현재 구현은 한 번 실행으로 끝나도록 구성

## 구성
### cron-contact-noti
- 매일 오전 8시(KST)에 동작하는 Cronjob
- 연락처 반복 알림을 받아야하는 유저들에게 메일을 전송

### cron-calendar-noti
- 1분마다 동작하는 Cronjob
- 등록된 일정에 대한 리마인드 메일 전송

## 주요 기술
### 기술 스택
- NestJS
- TypeScript
- Sequelize

### 메일 발송
- Mailgun 제품 이용
- SMTP 주소 도메인에 연결하고 라이브러리 이용해 간단하게 구현
