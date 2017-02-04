drop table users;
drop table courses;
drop table documents;
drop table SUBSCRIPTIONS;
drop table QUESTIONS;
drop table ANSWERS;
drop table FLASHCARDDECKS;
drop table FLASHCARDS;

CREATE TABLE USERS(
  USERS_UNIQUE_ID serial primary key not null,
  USERS_FIRSTNAME varchar not null,
  USERS_LASTNAME varchar not null,
  USERS_ISADMIN boolean not null default false,
  USERS_ISACTIVE boolean not null default true,
  
  USERS_EMAIL varchar not null,
  USERS_PASSWORD varchar not null,

  USERS_DESCRIPTION varchar default 'Web created users',
  USERS_ENTRYUSER varchar default 'Web App',
  USERS_DATECREATED timestamp default current_timestamp,
  USERS_DATEUPDATED timestamp default current_timestamp
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
  DOCUMENTS_COURSES_ID int not null,
  DOCUMENTS_USERS_ID int not null,
  DOCUMENTS_DESCRIPTION varchar default 'A simple document',
  DOCUMENTS_TYPE varchar default 'document',
  DOCUMENTS_DATECREATED timestamp default current_timestamp,
  DOCUMENTS_ISACTIVE boolean not null default true,
  DOCUMENTS_NUMLIKE int default 0,
  DOCUMENTS_NUMDISLIKE int default 0
);

CREATE TABLE SUBSCRIPTIONS(
  SUBSCRIPTIONS_UNIQUE_ID serial primary key not null,
  SUBSCRIPTIONS_COURSES_ID int not null,
  SUBSCRIPTIONS_USERS_ID int not null,
  SUBSCRIPTIONS_DATECREATED timestamp default current_timestamp,
  SUBSCRIPTIONS_ISACTIVE boolean default true
);

CREATE TABLE QUESTIONS(
  QUESTIONS_UNIQUE_ID serial primary key not null,
  QUESTIONS_TITLE varchar not null,
  QUESTIONS_BODY varchar not null default 'Empty',
  QUESTIONS_COURSES_ID int not null,
  QUESTIONS_USERS_ID int not null,
  QUESTIONS_DATECREATED timestamp default current_timestamp,
  QUESTIONS_DATEUPDATED timestamp default current_timestamp,
  QUESTIONS_ISACTIVE boolean not null default true
);

CREATE TABLE ANSWERS(
  ANSWERS_UNIQUE_ID serial primary key not null,
  ANSWERS_QUESTIONS_ID int not null,
  ANSWERS_COURSES_ID int not null,
  ANSWERS_USERS_ID int not null,
  ANSWERS_BODY varchar not null default 'Empty',
  ANSWERS_DATECREATED timestamp default current_timestamp,
  ANSWERS_DATEUPDATED timestamp default current_timestamp,
  ANSWERS_ISACTIVE boolean not null default true,
  ANSWERS_NUMLIKE int default 0,
  ANSWERS_NUMDISLIKE int default 0
);

CREATE TABLE FLASHCARDDECKS(
  FLASHCARDDECKS_UNIQUE_ID serial primary key not null,
  FLASHCARDDECKS_COURSES_ID int not null,
  FLASHCARDDECKS_USERS_ID int not null,
  FLASHCARDDECKS_NAME varchar not null default 'flashcard deck',
  FLASHCARDDECKS_DESCRIPTION varchar not null default 'This is a deck of flashcards',
  FLASHCARDDECKS_NUMCARDS int not null default 0,
  FLASHCARDDECKS_DATECREATED timestamp default current_timestamp,
  FLASHCARDDECKS_DATEUPDATED timestamp default current_timestamp
);

CREATE TABLE FLASHCARDS(
  FLASHCARDS_UNIQUE_ID serial primary key not null,
  FLASHCARDS_FLASHCARDSDECKS_ID int not null,
  FLASHCARDS_FRONT varchar not null default 'This is the front.',
  FLASHCARDS_BACK varchar not null default 'This is the back',
  FLASHCARDS_ISACTIVE boolean default true,
  FLASHCARDS_DATECREATED timestamp default current_timestamp,
  FLASHCARDS_DATEUPDATED timestamp default current_timestamp
);

insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_ISACTIVE, USERS_EMAIL, USERS_PASSWORD, USERS_DESCRIPTION, USERS_ENTRYUSER)
 values ('Jessica','Smith', true, true, 'jessica1@openalex.com', 'hunter2', 'Original Test Admin Account', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_ISACTIVE, USERS_EMAIL, USERS_PASSWORD, USERS_DESCRIPTION, USERS_ENTRYUSER)
 values ('Emma','Johnson', false, true, 'emma1@openalex.com', 'hunter2', 'Original Test User Account', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_ISACTIVE, USERS_EMAIL, USERS_PASSWORD, USERS_DESCRIPTION, USERS_ENTRYUSER)
 values ('Olivia','Williams', false, false, 'olivia1@openalex.com', 'hunter2', 'Original Test Inactive Account', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_ISACTIVE, USERS_EMAIL, USERS_PASSWORD, USERS_DESCRIPTION, USERS_ENTRYUSER)
 values ('Emma','Johnson', false, true, 'emma1@openalex.com', 'hunter2', 'Original Test User Account', 'default');


insert into COURSES (COURSES_NAME, COURSES_DESCRIPTION, COURSES_ISACTIVE) values ('MA 26500','Linear Algebra', false); 
insert into COURSES (COURSES_NAME, COURSES_DESCRIPTION) values ('CS 18000','Problem Solving And Object-Oriented Programming');
insert into COURSES (COURSES_NAME, COURSES_DESCRIPTION) values ('CS 18200','Foundations Of Computer Science');
insert into COURSES (COURSES_NAME, COURSES_DESCRIPTION) values ('CS 24000','Programming In C');
insert into COURSES (COURSES_NAME, COURSES_DESCRIPTION) values ('CS 25000','Computer Architecture'); 

insert into DOCUMENTS (DOCUMENTS_NAME, DOCUMENTS_LINK, DOCUMENTS_COURSES_ID, DOCUMENTS_USERS_ID, DOCUMENTS_TYPE) values ('Cake' , 'http://i.imgur.com/6Vvno2g.jpg',1,2,'picture');
update COURSES set COURSES_DATEUPDATED = current_timestamp where COURSES_UNIQUE_ID = 1;
insert into DOCUMENTS (DOCUMENTS_NAME, DOCUMENTS_LINK, DOCUMENTS_COURSES_ID, DOCUMENTS_USERS_ID, DOCUMENTS_TYPE) values ('Demo' , 'http://www.youtube.com/watch?v=dQw4w9WgXcQ', 2,1,'link');
update COURSES set COURSES_DATEUPDATED = current_timestamp where COURSES_UNIQUE_ID = 2;

insert into SUBSCRIPTIONS (SUBSCRIPTIONS_COURSES_ID, SUBSCRIPTIONS_USERS_ID) values (1,2);
update COURSES set COURSES_NUMMEMBER = 1 where COURSES_UNIQUE_ID = 1;
insert into SUBSCRIPTIONS (SUBSCRIPTIONS_COURSES_ID, SUBSCRIPTIONS_USERS_ID) values (2,1);
update COURSES set COURSES_NUMMEMBER = 1 where COURSES_UNIQUE_ID = 2;


