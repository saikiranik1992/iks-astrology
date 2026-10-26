FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn -B -q dependency:go-offline
COPY src ./src
RUN mvn -B -q -DskipTests package
FROM eclipse-temurin:17-jre-jammy
RUN useradd --create-home --uid 10001 astro
WORKDIR /app
COPY --from=build /build/target/iks-astrology-*.jar /app/app.jar
USER astro
ENV SERVER_PORT=8080
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
