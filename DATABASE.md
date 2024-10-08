## sys_user

```mysql
create table teamup.sys_user
(
    id        int auto_increment
        primary key,
    username  varchar(100)                                                                                          not null,
    password  varchar(200)                                                                                          not null,
    email     varchar(50)                                                                                           not null,
    major     varchar(100)                                                                                          not null,
    grade     varchar(20)                                                                                           not null,
    avatar    varchar(200) default 'https://q9.itc.cn/q_70/images03/20240110/1f984d01360541d3ad28b4d2c0166b1d.jpeg' not null,
    is_banned int          default 0                                                                                not null,
    constraint `UNIQUE`
        unique (email)
);
```

## sys_role

```mysql
create table teamup.sys_role
(
    id   int auto_increment
        primary key,
    role varchar(20) not null
);
```

## sys_menu

```mysql
create table teamup.sys_menu
(
    id   int auto_increment
        primary key,
    menu varchar(100) not null
);
```

## sys_user_role

```mysql
create table teamup.sys_user_role
(
    id      int auto_increment
        primary key,
    user_id int not null,
    role_id int not null,
    constraint sys_user_role_sys_role_id_fk
        foreign key (role_id) references teamup.sys_role (id),
    constraint sys_user_role_sys_user_id_fk
        foreign key (user_id) references teamup.sys_user (id)
);
```

## sys_role_menu

```mysql
create table teamup.sys_role_menu
(
    id      int auto_increment
        primary key,
    role_id int not null,
    menu_id int not null,
    constraint sys_role_menu_sys_menu_id_fk
        foreign key (menu_id) references teamup.sys_menu (id),
    constraint sys_role_menu_sys_role_id_fk
        foreign key (role_id) references teamup.sys_role (id)
);
```

## award

1. id：数据库自增id
2. user_id：用户id
3. title：赛事名称
4. prize：奖项名称
5. date:：获奖日期
6. proof：获奖证明

7. is_delete：是否被删除

```mysql
create table teamup.award
(
    id        int auto_increment
        primary key,
    user_id   int           not null,
    title     varchar(100)  not null,
    prize     varchar(50)   not null,
    date      date          not null,
    proof     varchar(200)  not null,
    is_delete int default 0 not null,
    constraint award_sys_user_id_fk
        foreign key (user_id) references teamup.sys_user (id)
);
```

