﻿FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ["Reactivities.sln", "Reactivities.sln"]
COPY ["API/API.csproj", "API/API.csproj"]
COPY ["Application/Application.csproj", "Application/Application.csproj"]
COPY ["Domain/Domain.csproj", "Domain/Domain.csproj"]
COPY ["Persistence/Persistence.csproj", "Persistence/Persistence.csproj"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/Infrastructure.csproj"]

RUN dotnet restore "Reactivities.sln"

# Copy everything else and build
COPY . .
WORKDIR /app
RUN dotnet publish -c Release -o out


# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 as base

WORKDIR /app

COPY . /app

ENTRYPOINT ["dotnet", "API.dll"] 

