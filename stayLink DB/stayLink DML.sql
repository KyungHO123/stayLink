#회원권한
insert into authority(user_auth)values("일반회원"),("숙소회원"),("관리자");

#회원상태
insert into userstate(user_state)values("이용중"),("이용정지"),("영구정지");

#숙소 종류
insert into lodtype(lod_type)values("호텔/리조트"),("펜션/풀빌라"),("프리미엄"),("가족형숙소"),("모텔");

#숙소 상태
insert into lodstate(lod_state)values("승인대기"),("영업중"),("영업정지");

#예약 상태
insert into reservestate(reserve_state)values("예약완료"),("예약취소");

#결제 상태
insert into paymentState (paymentState)values("결제완료"),("결제취소"),("결제오류");
