FROM openjdk:15 AS TEMP_BUILD_IMAGE
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY build.gradle settings.gradle gradlew $APP_HOME
COPY gradle $APP_HOME/gradle
COPY . .
RUN chmod +x gradlew
RUN ./gradlew build

FROM openjdk:15
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY --from=TEMP_BUILD_IMAGE $APP_HOME/build/libs/*.jar spring-boot-app.jar
EXPOSE 3001
CMD java -jar $APP_HOME/spring-boot-app.jar