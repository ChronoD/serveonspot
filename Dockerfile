# Build stage 1
FROM node:18-slim as build_front
WORKDIR /react-app
COPY ./frontend ./
RUN yarn install
RUN ls -la /react-app
RUN yarn react-scripts build


# Build stage 2
FROM maven:3.6.0-jdk-11-slim AS build_back
COPY src /home/app/src
COPY pom.xml /home/app
COPY --from=build_front /react-app/build /usr/src/front
RUN rm -rf /home/app/src/main/resources/static &&\
mv /usr/src/front /home/app/src/main/resources/static &&\
mvn -f /home/app/pom.xml clean package


# Package stage
FROM openjdk:11-jre-slim
COPY --from=build_back /home/app/target/andrejusdemoproject-0.0.1-SNAPSHOT.jar /usr/local/lib/andrejusdemoproject.jar
RUN apt-get update
EXPOSE 8081
ENTRYPOINT ["java","-jar","/usr/local/lib/andrejusdemoproject.jar"]
