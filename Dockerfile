FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app
EXPOSE 8080

# Copy csproj and restore as distinct layers
COPY Reactivities.sln .  
COPY API/API.csproj API/  
COPY Application/Application.csproj Application/  
COPY Domain/Domain.csproj Domain/  
COPY Persistence/Persistence.csproj Persistence/  
COPY Infrastructure/Infrastructure.csproj Infrastructure/  

RUN dotnet restore "Reactivities.sln"

# Copy everything else and build
COPY . .
WORKDIR /app
RUN dotnet publish -c Release --no-restore -o out


# Build runtime image
FROM mcr.microsoft.com/dotnet/sdk:8.0
COPY --from=build-env /app/out .

WORKDIR /app
ENTRYPOINT ["dotnet", "API.dll"] 

