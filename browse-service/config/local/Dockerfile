FROM openjdk:15 AS TEMP_BUILD_IMAGE
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY build.gradle settings.gradle gradlew $APP_HOME
COPY gradle $APP_HOME/gradle
COPY . .
RUN chmod +x gradlew
RUN ./gradlew build

FROM openjdk:15
ENV ARTIFACT_NAME=browse-service-1.0.0.jar
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY --from=TEMP_BUILD_IMAGE $APP_HOME/build/libs/$ARTIFACT_NAME .
EXPOSE 3002
CMD java -Dspring.profiles.active=local -jar $ARTIFACT_NAME 