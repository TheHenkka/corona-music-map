CREATE TABLE countries (
    id               INTEGER,
    country_name     VARCHAR(128) NOT NULL PRIMARY KEY UNIQUE
);

CREATE TABLE playlist (
   id        INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,
   week      INTEGER NOT NULL,
   country   VARCHAR(128) NOT NULL,
   position  INTEGER  NOT NULL,
   song      VARCHAR(512) NOT NULL,
   artist    VARCHAR(512) NOT NULL,
   streams   INTEGER NOT NULL ,
   website   VARCHAR(2083) NOT NULL,
   FOREIGN KEY(country) REFERENCES countries(country_name)
);