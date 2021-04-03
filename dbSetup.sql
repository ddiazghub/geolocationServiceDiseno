create table if not exists vehicle (
    id char(6) not null primary key,
    latitude float not null,
    longitude float not null,
    tstamp int not null
);

create table if not exists efee70 (
	tstamp int not null primary key,
	latitude float not null,
	longitude float not null
);

create table if not exists "487a8d" (
	tstamp int not null primary key,
	latitude float not null,
	longitude float not null
);

create table if not exists b7ea25 (
	tstamp int not null primary key,
	latitude float not null,
	longitude float not null
);

insert into vehicle (id, latitude, longitude, tstamp) values ('efee70', 11.027389526367188, -74.86152648925781, 1);
insert into vehicle (id, latitude, longitude, tstamp) values ('487a8d', 10.923937797546387, -74.82032012939453, 1);
insert into vehicle (id, latitude, longitude, tstamp) values ('b7ea25', 10.93842601776123, -74.80989837646484, 1);