## Если используешь докер (дай тебе бог терпения)
1) Создаёшь Dockerfile в корне проекта с таким контентом

```
FROM node:16-alpine
WORKDIR /app
# Install node-gyp
RUN npm -g config set user root
RUN npm install -g node-gyp
# Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
# Install gcc and make
RUN apk add build-base
# Install libxtst-dev and libpng++-dev
RUN apk add libxtst-dev libpng-dev
# Install xauth
RUN apk add xauth
RUN touch ~/.Xauthority && chmod 644 ~/.Xauthority

COPY . .
```

2) Билдишь образ контейнера:
```
docker build -t task4:latest .
```

3) На хосте выполняешь команду `xauth list`. Вывод должен быть примерно такой. Нам нужно запомнить первую строку
```
e.udavihin@cmdb-128986:~/Projects/Nodejs_Course/nodejs_task4_remote_control$ xauth list
cmdb-128986/unix:  MIT-MAGIC-COOKIE-1  a40718035856e7848ec628024dc1f5f1
#ffff#636d64622d313238393836#:  MIT-MAGIC-COOKIE-1  a40718035856e7848ec628024dc1f5f1
```

4) Запускаешь докер контейнер и открываешь терминал (если ты не линуксоид то `pwd` замени на текущую директорию)
```
docker run --network host -v $(pwd)/app -v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY=$DISPLAY -it task4 sh
```

5) В терминале докера выполняешь `xauth add localhost:0  MIT-MAGIC-COOKIE-<тут цифра 1, 2 или т.д от моника зависит>  <токен>`
Если видешь ошибку (после перезапуска контейнера): 
```
/app # npm run start

> app@1.0.0 start
> node ./src/index.js

No protocol specified
No protocol specified
Could not open main display
Segmentation fault (core dumped)
```
То повтори шаг 5
6) Переходи к **Если не используешь докер**
## Если не используешь докер

**У меня были проблемы с установкой robotjs, но я изолировал своё окружение в докер, возможно тебе придётся глобально установить node-gyp и другие зависимости для твоей системы список тут https://robotjs.io/docs/building:**  
`npm install -g node-gyp`  
Но скорее всего, если у тебя вышло запустить robotjs у себя, то проблем быть не должно