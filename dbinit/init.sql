create database if not exists patientsdb;
use patientsdb;
drop table if exists patients;
create table patients
(
id 			bigint unsigned not null auto_increment,
first_name  varchar (255) default null,
last_name   varchar (255) default null,
email 		varchar (255) default null,
address 	varchar (255) default null,
diagnosis 	varchar (255) default null,
phone 		varchar (30) default null,
status 		varchar (30) default null,
created_at  timestamp default current_timestamp,
image_url   varchar (255) default null,
primary key (id),
constraint uq_Patients_Email unique (email)
) auto_increment=1;
