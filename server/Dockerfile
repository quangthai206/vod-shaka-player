FROM google/shaka-packager

RUN apk add --update nodejs npm ffmpeg

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]