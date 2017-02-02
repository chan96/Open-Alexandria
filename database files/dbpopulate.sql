drop table users;
drop table courses;
drop table documents;

CREATE TABLE USERS(
  USERS_UNIQUE_ID serial primary key not null,
  USERS_FIRSTNAME varchar not null,
  USERS_LASTNAME varchar not null,
  USERS_ISADMIN boolean not null default false,
  USERS_ISACTIVE boolean not null,
  
  USERS_EMAIL varchar not null,
  USERS_PASSWORD varchar not null,

  USERS_DESCRIPTION varchar default 'Web created users',
  USERS_ENTRYUSER varchar default 'Web App',
  USERS_DATEADDED timestamp default current_timestamp
 );

CREATE TABLE COURSES(
  COURSES_UNIQUE_ID serial primary key not null,
  COURSES_DATECREATED timestamp default current_timestamp,
  COURSES_DATEUPDATED timestamp default current_timestamp,
  COURSES_NUMMEMBER int default 0,
  COURSES_NAME varchar not null,
  COURSES_DESCRIPTION varchar default 'A simple course',
  COURSES_ISACTIVE boolean not null default true
);

CREATE TABLE DOCUMENTS(
  DOCUMENTS_UNIQUE_ID serial primary key not null,
  DOCUMENTS_NAME varchar not null,
  DOCUMENTS_LINK varchar not null,
  DOCUMENTS_DESCRIPTION varchar default 'A simple document',
  DOCUMENTS_CREATED timestamp default current_timestamp,
  DOCUMENTS_ISACTIVE boolean not null default true,
  DOCUMENTS_NUMLIKE int default 0,
  DOCUMENTS_NUMDISLIKE int default 0
);

insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_ISACTIVE, USERS_EMAIL, USERS_PASSWORD, USERS_DESCRIPTION, USERS_ENTRYUSER)
 values ('Jessica','Smith', true, true, 'jessica1@openalex.com', 'hunter2', 'Original Test Admin Account', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_ISACTIVE, USERS_EMAIL, USERS_PASSWORD, USERS_DESCRIPTION, USERS_ENTRYUSER)
 values ('Emma','Johnson', false, true, 'emma1@openalex.com', 'hunter2', 'Original Test User Account', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_ISACTIVE, USERS_EMAIL, USERS_PASSWORD, USERS_DESCRIPTION, USERS_ENTRYUSER)
 values ('Olivia','Williams', false, false, 'olivia1@openalex.com', 'hunter2', 'Original Test Inactive Account', 'default');

insert into COURSES (COURSES_NAME, COURSES_DESCRIPTION) values ('CS 18000','Problem Solving And Object-Oriented Programming');
insert into COURSES (COURSES_NAME, COURSES_DESCRIPTION) values ('CS 18200','Foundations Of Computer Science');
insert into COURSES (COURSES_NAME, COURSES_DESCRIPTION) values ('CS 24000','Programming In C');
insert into COURSES (COURSES_NAME, COURSES_DESCRIPTION) values ('CS 25000','Computer Architecture'); 

insert into DOCUMENTS (DOCUMENTS_NAME, DOCUMENTS_LINK) values ('Purdue Logo' , 'http://www.uwlafayette.org/sites/uwlafayette.org/files/PU%20logo.png');
