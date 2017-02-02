drop table users;

CREATE TABLE USERS(
  USERS_UNIQUE_ID serial primary key not null,
  USERS_FIRSTNAME varchar not null,
  USERS_LASTNAME varchar not null,
  USERS_ISADMIN boolean not null,
  USERS_ISACTIVE boolean not null,
  
  USERS_EMAIL varchar not null,
  USERS_PASSWORD varchar not null,

  USERS_DESCRIPTION varchar,
  USERS_ENTRYUSER varchar,
  USERS_DATEADDED timestamp default current_timestamp
 );

insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_ISACTIVE, USERS_EMAIL, USERS_PASSWORD, USERS_DESCRIPTION, USERS_ENTRYUSER)
 values ('Jessica','Smith', true, true, 'jessica1@openalex.com', 'hunter2', 'Original Test Admin Account', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_ISACTIVE, USERS_EMAIL, USERS_PASSWORD, USERS_DESCRIPTION, USERS_ENTRYUSER)
 values ('Emma','Johnson', false, true, 'emma1@openalex.com', 'hunter2', 'Original Test User Account', 'default');