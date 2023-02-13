drop table if exists urls;

create table urls (
  id serial primary key ,
  hex varchar(6) not null unique,
  original_url varchar(2048) not null,
  created text default to_char(timezone('EST', current_timestamp(0)), 'YYYY-MM-DD HH12:MI:SS am')
);

insert into urls (hex, original_url)
values('aaa', 'http://www.google.com'), ('bbb', 'http://www.amazon.com'), ('fly', 'https://fly.io/apps/baz-test/monitoring');

select * from urls u ;
