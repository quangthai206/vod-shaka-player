FROM mongo

COPY users.json ./

COPY courses.json ./

COPY importData.sh /docker-entrypoint-initdb.d/
