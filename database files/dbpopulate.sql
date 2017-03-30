drop table if exists USERS;
drop table if exists COURSES;
drop table if exists DOCUMENTS;
drop table if exists SUBSCRIPTIONS;
drop table if exists QUESTIONS;
drop table if exists ANSWERS;
drop table if exists FLASHCARDDECKS;
drop table if exists FLASHCARDS;
drop table if exists USERSFEEDBACK;
drop table if exists COMMENTS;
drop table if exists TAGLIST;
drop table if exists TAGLINK;

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
  COURSES_SCHOOL_ID int default 0,
  COURSES_NUMMEMBER int default 0,
  COURSES_NAME varchar not null,
  COURSES_DESCRIPTION varchar default 'A simple course',
  COURSES_ISACTIVE boolean not null default true
);

CREATE TABLE DOCUMENTS(
  DOCUMENTS_UNIQUE_ID serial primary key not null,
  DOCUMENTS_NAME varchar not null,
  DOCUMENTS_PREVIEW varchar not null,
  DOCUMENTS_LINK varchar not null,
  DOCUMENTS_COURSES_ID int not null,
  DOCUMENTS_USERS_ID int not null,
  DOCUMENTS_DESCRIPTION varchar default 'A simple document',
  DOCUMENTS_TYPE varchar default 'document',
  DOCUMENTS_DATECREATED timestamp default current_timestamp,
  DOCUMENTS_ISACTIVE boolean not null default true,
  DOCUMENTS_NUMLIKE int default 0,
  DOCUMENTS_NUMDISLIKE int default 0,
  DOCUMENTS_RATINGS int default 0
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
  QUESTIONS_ISACTIVE boolean not null default true,
  QUESTIONS_NUMLIKE int default 0,
  QUESTIONS_NUMDISLIKE int default 0
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
  FLASHCARDDECKS_ISACTIVE boolean not null default true,
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

CREATE TABLE USERSFEEDBACK(
  USERSFEEDBACK_UNIQUE_ID serial primary key not null,
  USERSFEEDBACK_USERS_ID int not null,
  /*
  ID  Type
  0   void
  1   document
  2   question
  3   answer
  */
  USERSFEEDBACK_TYPE int not null,
  USERSFEEDBACK_ITEM_ID int not null,
  USERSFEEDBACK_ISLIKE boolean,
  USERSFEEDBACK_RATING decimal
);

CREATE TABLE COMMENTS(
  COMMENTS_UNIQUE_ID serial primary key not null,
  COMMENTS_USERS_ID int not null,
  COMMENTS_ITEM_ID int not null,
  COMMENTS_TEXT varchar default '<>'
);

CREATE TABLE TAGLIST(
  TAGLIST_UNIQUE_ID serial primary key not null,
  TAGLIST_TEXT varchar not null
);

CREATE TABLE TAGLINK(
  TAGLINK_UNIQUE_ID serial primary key not null,
  TAGLINK_TAGLIST_ID int,
  TAGLINK_DOCUMENTS_ID int
);

insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_ISACTIVE, USERS_EMAIL, USERS_PASSWORD, USERS_DESCRIPTION, USERS_ENTRYUSER)
 values ('Jessica','Smith', true, true, 'jessica1@openalex.com', 'hunter2', 'Original Test Admin Account', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_ISACTIVE, USERS_EMAIL, USERS_PASSWORD, USERS_DESCRIPTION, USERS_ENTRYUSER)
 values ('Emma','Johnson', false, true, 'emma1@openalex.com', 'hunter2', 'Original Test User Account', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_ISACTIVE, USERS_EMAIL, USERS_PASSWORD, USERS_DESCRIPTION, USERS_ENTRYUSER)
 values ('Olivia','Williams', false, false, 'olivia1@openalex.com', 'hunter2', 'Original Test Inactive Account', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_ISACTIVE, USERS_EMAIL, USERS_PASSWORD, USERS_DESCRIPTION, USERS_ENTRYUSER)
 values ('Emma','Johnson', false, true, 'emma1@openalex.com', 'hunter2', 'Original Test User Account', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_ISACTIVE, USERS_EMAIL, USERS_PASSWORD, USERS_DESCRIPTION, USERS_ENTRYUSER)
 values ('An','Admin', true, true, 'a', 'a', 'a Test User Account', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_ISACTIVE, USERS_EMAIL, USERS_PASSWORD, USERS_DESCRIPTION, USERS_ENTRYUSER)
 values ('An','User', false, true, 'u', 'u', 'a Test User Account', 'default');

insert into COURSES (COURSES_SCHOOL_ID, COURSES_NAME, COURSES_DESCRIPTION, COURSES_ISACTIVE) values (8384, 'MA 26500','Linear Algebra', false); 
insert into COURSES (COURSES_SCHOOL_ID, COURSES_NAME, COURSES_DESCRIPTION) values (8384, 'CS 18000','Problem Solving And Object-Oriented Programming');
insert into COURSES (COURSES_SCHOOL_ID, COURSES_NAME, COURSES_DESCRIPTION) values (8384, 'CS 18200','Foundations Of Computer Science');
insert into COURSES (COURSES_SCHOOL_ID, COURSES_NAME, COURSES_DESCRIPTION) values (8384, 'CS 24000','Programming In C');
insert into COURSES (COURSES_SCHOOL_ID, COURSES_NAME, COURSES_DESCRIPTION) values (7847, 'CS 25000','Computer Architecture'); 

insert into DOCUMENTS (DOCUMENTS_NAME, DOCUMENTS_PREVIEW, DOCUMENTS_LINK, DOCUMENTS_COURSES_ID, DOCUMENTS_USERS_ID, DOCUMENTS_TYPE) values ('Cake' , 'purple.com', 'http://i.imgur.com/6Vvno2g.jpg',1,2,'picture');
update COURSES set COURSES_DATEUPDATED = current_timestamp where COURSES_UNIQUE_ID = 1;
insert into DOCUMENTS (DOCUMENTS_NAME, DOCUMENTS_PREVIEW, DOCUMENTS_LINK, DOCUMENTS_COURSES_ID, DOCUMENTS_USERS_ID, DOCUMENTS_TYPE) values ('Demo' , 'purple.com', 'http://i.imgur.com/QVFeCyP.jpg', 2,1,'link');
update COURSES set COURSES_DATEUPDATED = current_timestamp where COURSES_UNIQUE_ID = 2;

insert into SUBSCRIPTIONS (SUBSCRIPTIONS_COURSES_ID, SUBSCRIPTIONS_USERS_ID) values (1,2);
update COURSES set COURSES_NUMMEMBER = 1 where COURSES_UNIQUE_ID = 1;
insert into SUBSCRIPTIONS (SUBSCRIPTIONS_COURSES_ID, SUBSCRIPTIONS_USERS_ID) values (2,1);
update COURSES set COURSES_NUMMEMBER = 1 where COURSES_UNIQUE_ID = 2;

insert into QUESTIONS (QUESTIONS_TITLE, QUESTIONS_BODY, QUESTIONS_COURSES_ID, QUESTIONS_USERS_ID)
  values ('What is the meaning of life', 'See title', 2, 2);
insert into ANSWERS (ANSWERS_QUESTIONS_ID, ANSWERS_COURSES_ID, ANSWERS_USERS_ID, ANSWERS_BODY)
  values (1, 2, 1, 'get outta here');

insert into FLASHCARDDECKS (FLASHCARDDECKS_COURSES_ID, FLASHCARDDECKS_USERS_ID, FLASHCARDDECKS_NAME) values (2,2,'Java Volcab');
insert into FLASHCARDS (FLASHCARDS_FLASHCARDSDECKS_ID, FLASHCARDS_FRONT, FLASHCARDS_BACK) values (1,'What is ASCII?',' A standard assignment of 7-bit numeric codes to characters.');
update FLASHCARDDECKS set FLASHCARDDECKS_DATEUPDATED =  current_timestamp where FLASHCARDDECKS_UNIQUE_ID = 1;

insert into TAGLIST(TAGLIST_TEXT) values ('Demo');
insert into TAGLINK(TAGLINK_TAGLIST_ID, TAGLINK_DOCUMENTS_ID) values (1, 1);
insert into TAGLIST(TAGLIST_TEXT) values ('Example');
insert into TAGLINK(TAGLINK_TAGLIST_ID, TAGLINK_DOCUMENTS_ID) values (2, 1);
insert into TAGLINK(TAGLINK_TAGLIST_ID, TAGLINK_DOCUMENTS_ID) values (2, 2);
