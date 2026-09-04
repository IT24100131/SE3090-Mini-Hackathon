FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["TourismApi.csproj", "./"]
RUN dotnet restore "TourismApi.csproj"

COPY . .
RUN dotnet build "TourismApi.csproj" -c Release -o /app/build
RUN dotnet publish "TourismApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "TourismApi.dll"]