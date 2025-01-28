DROP TABLE IF EXISTS `userState`;

CREATE TABLE `userState` (
	`user_state` varchar(10) primary key
);

DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
	`payment_num`	int	AUTO_INCREMENT PRIMARY KEY,
	`payment_price`	int	NOT NULL,
	`payment_type`	varchar(50)	NOT NULL,
	`payment_date`	datetime NULL,
	`payment_reserve_num`	int	NOT NULL,
	`paymentState`	varchar(10)	NOT NULL
);

DROP TABLE IF EXISTS `reserveState`;

CREATE TABLE `reserveState` (
	`reserve_state`	varchar(10) PRIMARY KEY
);

DROP TABLE IF EXISTS `view`;

CREATE TABLE `view` (
	`view_num`	int	AUTO_INCREMENT PRIMARY KEY,
	`view_date`	datetime	NULL,
	`view_user_num`	int	NOT NULL,
	`view_lod_num`	int	NOT NULL
);

DROP TABLE IF EXISTS `log`;

CREATE TABLE `log` (
	`log_num`	int	AUTO_INCREMENT PRIMARY KEY,
	`log_in`	datetime	NULL,
	`log_out`	datetime	NULL,
	`log_ip`	varchar(100)	NULL,
	`log_country`	varchar(20)	NULL,
	`log_user_num`	int	NOT NULL
);

DROP TABLE IF EXISTS `lodType`;

CREATE TABLE `lodType` (
	`lod_type`	varchar(10)	PRIMARY KEY
);

DROP TABLE IF EXISTS `review`;

CREATE TABLE `review` (
	`review_num`	int AUTO_INCREMENT PRIMARY KEY,
	`review_content`	varchar(255) NOT NULL,
	`review_reserve_num`	int	NOT NULL
);

DROP TABLE IF EXISTS `lodState`;

CREATE TABLE `lodState` (
	`lod_state`	varchar(10) PRIMARY KEY
);

DROP TABLE IF EXISTS `search`;

CREATE TABLE `search` (
	`search_num`	int	AUTO_INCREMENT PRIMARY KEY,
	`search_content`	varchar(50) NOT NULL,
	`search_date`	datetime	NULL,
	`search_user_num`	int	NOT NULL
);

DROP TABLE IF EXISTS `file`;

CREATE TABLE `file` (
	`file_num`	int	AUTO_INCREMENT PRIMARY KEY,
	`file_name`	varchar(255)NOT NULL,
	`file_ori_name`	varchar(255)NOT NULL,
	`file_fk_num`	int	NULL,
	`file_type`	varchar(50)	NULL
);

DROP TABLE IF EXISTS `schedule`;

CREATE TABLE `schedule` (
	`schedule_num`	int	AUTO_INCREMENT PRIMARY KEY,
	`schedule_typeNum`	int NOT	NULL,
	`schedule_type`	varchar(10)	NOT NULL,
	`schedule_date`	datetime	NULL
);

DROP TABLE IF EXISTS `authority`;

CREATE TABLE `authority` (
	`user_auth`	varchar(10) PRIMARY KEY
);

DROP TABLE IF EXISTS `stayRoom`;

CREATE TABLE `stayRoom` (
	`stay_num`	int	AUTO_INCREMENT PRIMARY KEY,
	`stay_in`	int	NOT NULL,
	`stay_out`	int	NOT NULL,
	`stay_discount`	decimal(5,2)NOT NULL DEFAULT 0,
	`stay_price`	int	NOT NULL,
	`stay_disc`	int	NOT NULL,
	`stay_count`	int	NOT NULL,
	`stay_room_num`	int	NOT NULL
);

DROP TABLE IF EXISTS `reserve`;

CREATE TABLE `reserve` (
	`reserve_num`	int	AUTO_INCREMENT PRIMARY KEY,
	`reserve_date`	datetime NOT NULL,
	`reserve_user_num`	int	NOT NULL,
	`reserve_state`	varchar(10)	NOT NULL,
	`reserve_schedule_num`	int	NOT NULL
);

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
	`user_num`	int	AUTO_INCREMENT PRIMARY KEY,
	`user_id`	varchar(20) UNIQUE NOT NULL,
	`user_pw`	varchar(255)	NOT NULL,
	`user_email`	varchar(50)	UNIQUE NOT NULL,
	`user_phone`	varchar(11)	UNIQUE NOT NULL,
	`user_create`	datetime NULL,
	`user_cookie`	varchar(255)	NULL,
	`user_cookie _limit`	datetime	NULL,
	`user_nickName`	varchar(12)UNIQUE NOT NULL,
	`user_post`	varchar(20)	NOT NULL,
	`user_address`	varchar(100)NOT NULL,
	`user_detail`	varchar(255)NOT NULL,
	`user_gender`	varchar(10)NOT NULL,
	`user_auth`	varchar(10)	NOT NULL,
	`user_state`	varchar(10)	NOT NULL,
   `user_sido` VARCHAR(45) NOT NULL  ,
	`user_sigungu` VARCHAR(45) NOT NULL ,
	`user_bname` VARCHAR(45) NULL  
);

DROP TABLE IF EXISTS `paymentState`;

CREATE TABLE `paymentState` (
	`paymentState`	varchar(10)	PRIMARY KEY
);

DROP TABLE IF EXISTS `dayRoom`;

CREATE TABLE `dayRoom` (
	`day_num`	int	AUTO_INCREMENT PRIMARY KEY,
	`day_max`	int NOT	NULL,
	`day_discount`	decimal(5,2) NOT NULL DEFAULT 0,
	`day_price`	int	NOT NULL,
	`day_disc`	int	NOT NULL,
	`day_count`	int	NOT NULL,
	`day_room_num`	int	NOT NULL,
	`day_start`	time NOT NULL,
	`day_end`	time NOT NULL
);

DROP TABLE IF EXISTS `lodging`;

CREATE TABLE `lodging` (
	`lod_num`	int	AUTO_INCREMENT PRIMARY KEY,
	`lod_name`	varchar(50)	UNIQUE NOT NULL,
	`lod_license`	varchar(10)UNIQUE NOT NULL,
	`lod_post`	varchar(10)	NOT NULL,
	`lod_address`	varchar(255) NOT NULL,
	`lod_detail`	varchar(255) NOT NULL,
	`lod_introduce`	varchar(255) NOT NULL,
	`lod_create`	datetime	NULL,
	`lod_language`	varchar(30)	NOT NULL,
	`lod_Amenities`	varchar(255) NOT NULL,
	`lod_entering`	varchar(255) NOT NULL,
	`lod_instruction`	varchar(255)NOT NULL,
	`lod_parkingInfo`	varchar(255)NOT NULL,
	`lod_notice`	varchar(255)NOT NULL,
	`lod_smoke`	varchar(255)NOT NULL,
	`lod_state`	varchar(10)	NOT NULL,
	`lod_user_num`	int	NOT NULL,
	`lod_parking`	varchar(10)	NULL,
	`lod_type`	varchar(10)	NOT NULL,
    `lod_sido` varchar(45) not null,
`lod_sigungu` varchar(45) not null,
`lod_bname` varchar(45) null
);

DROP TABLE IF EXISTS `favorite`;

CREATE TABLE `favorite` (
	`favorite_num`	int	AUTO_INCREMENT PRIMARY KEY,
	`favorite_date`	datetime	NULL,
	`favorite_user_num`	int	NOT NULL,
	`favorite_lod_num`	int	NOT NULL
);

DROP TABLE IF EXISTS `room`;

CREATE TABLE `room` (
	`room_num`	int	AUTO_INCREMENT PRIMARY KEY,
	`room_name`	varchar(100)NOT NULL,
	`room_count`	int	NOT NULL,
	`room_max`	int	NOT NULL,
	`room_min`	int	NOT NULL,
	`room_bed`	varchar(20)	NOT NULL,
	`room_size`	varchar(10)	NOT NULL,
	`room_smoke`	varchar(10)	NOT NULL,
	`room_detail`	varchar(255)NOT NULL,
	`room_lod_num`	int	NOT NULL
);

DROP TABLE IF EXISTS `rating`;

CREATE TABLE `rating` (
	`rating_num`	int	AUTO_INCREMENT PRIMARY KEY,
	`rating_count`	decimal(2,1) NOT NULL DEFAULT 0.5,
	`rating_review_num`	int	NOT NULL
);

user

ALTER TABLE `payment` ADD CONSTRAINT `FK_reserve_TO_payment_1` FOREIGN KEY (
	`payment_reserve_num`
)
REFERENCES `reserve` (
	`reserve_num`
);

ALTER TABLE `payment` ADD CONSTRAINT `FK_paymentState_TO_payment_1` FOREIGN KEY (
	`paymentState`
)
REFERENCES `paymentState` (
	`paymentState`
);

ALTER TABLE `view` ADD CONSTRAINT `FK_user_TO_view_1` FOREIGN KEY (
	`view_user_num`
)
REFERENCES `user` (
	`user_num`
);

ALTER TABLE `view` ADD CONSTRAINT `FK_lodging_TO_view_1` FOREIGN KEY (
	`view_lod_num`
)
REFERENCES `lodging` (
	`lod_num`
);

ALTER TABLE `log` ADD CONSTRAINT `FK_user_TO_log_1` FOREIGN KEY (
	`log_user_num`
)
REFERENCES `user` (
	`user_num`
);

ALTER TABLE `review` ADD CONSTRAINT `FK_reserve_TO_review_1` FOREIGN KEY (
	`review_reserve_num`
)
REFERENCES `reserve` (
	`reserve_num`
);

ALTER TABLE `search` ADD CONSTRAINT `FK_user_TO_search_1` FOREIGN KEY (
	`search_user_num`
)
REFERENCES `user` (
	`user_num`
);

ALTER TABLE `stayRoom` ADD CONSTRAINT `FK_room_TO_stayRoom_1` FOREIGN KEY (
	`stay_room_num`
)
REFERENCES `room` (
	`room_num`
);

ALTER TABLE `reserve` ADD CONSTRAINT `FK_user_TO_reserve_1` FOREIGN KEY (
	`reserve_user_num`
)
REFERENCES `user` (
	`user_num`
);

ALTER TABLE `reserve` ADD CONSTRAINT `FK_reserveState_TO_reserve_1` FOREIGN KEY (
	`reserve_state`
)
REFERENCES `reserveState` (
	`reserve_state`
);

ALTER TABLE `reserve` ADD CONSTRAINT `FK_schedule_TO_reserve_1` FOREIGN KEY (
	`reserve_schedule_num`
)
REFERENCES `schedule` (
	`schedule_num`
);

ALTER TABLE `user` ADD CONSTRAINT `FK_authority_TO_user_1` FOREIGN KEY (
	`user_auth`
)
REFERENCES `authority` (
	`user_auth`
);

ALTER TABLE `user` ADD CONSTRAINT `FK_userState_TO_user_1` FOREIGN KEY (
	`user_state`
)
REFERENCES `userState` (
	`user_state`
);

ALTER TABLE `dayRoom` ADD CONSTRAINT `FK_room_TO_dayRoom_1` FOREIGN KEY (
	`day_room_num`
)
REFERENCES `room` (
	`room_num`
);

ALTER TABLE `lodging` ADD CONSTRAINT `FK_lodState_TO_lodging_1` FOREIGN KEY (
	`lod_state`
)
REFERENCES `lodState` (
	`lod_state`
);

ALTER TABLE `lodging` ADD CONSTRAINT `FK_user_TO_lodging_1` FOREIGN KEY (
	`lod_user_num`
)
REFERENCES `user` (
	`user_num`
);

ALTER TABLE `lodging` ADD CONSTRAINT `FK_lodType_TO_lodging_1` FOREIGN KEY (
	`lod_type`
)
REFERENCES `lodType` (
	`lod_type`
);

ALTER TABLE `favorite` ADD CONSTRAINT `FK_user_TO_favorite_1` FOREIGN KEY (
	`favorite_user_num`
)
REFERENCES `user` (
	`user_num`
);

ALTER TABLE `favorite` ADD CONSTRAINT `FK_lodging_TO_favorite_1` FOREIGN KEY (
	`favorite_lod_num`
)
REFERENCES `lodging` (
	`lod_num`
);

ALTER TABLE `room` ADD CONSTRAINT `FK_lodging_TO_room_1` FOREIGN KEY (
	`room_lod_num`
)
REFERENCES `lodging` (
	`lod_num`
);

ALTER TABLE `rating` ADD CONSTRAINT `FK_review_TO_rating_1` FOREIGN KEY (
	`rating_review_num`
)
REFERENCES `review` (
	`review_num`
);

