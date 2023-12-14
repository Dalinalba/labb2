# labb2
React projekt med create-react-app
10 komponenter 

HeaderComponent Innehåller appens namn och navigationslänkar.
PlanetList: Hämtar och visar en lista över planeter från NASA:s API.
använd useMemo för att memorera listan över planeter och använd
useCallback för att memorera fetchPlanets-funktionen. Detta kan hjälpa till att optimera prestandan genom att undvika onödig omrendering och återskapande av funktioner.
PlanetDetails mer detaljer för varje planet.
AstronautComponent: Presenterar information om olika astronauter från ett API som tillhandahåller astronautdata.
SpaceImageComponent: Hämtar och visar slumpmässiga rymdbilder från NASA:s bild-API.
SpaceFactComponent: Använder ett API  för att hämta fakta om rymden.
StyledButton: En återanvändbar knappkomponent som stylas med Styled Components.
CountdownTimer: En nedräkningskomponent som använder useReducer för att hantera nedräkningen och useEffect för att uppdatera gränssnittet. använd i AstronautComponent för att räkna 10 sek och hämta uppdaterad info från API. 
ThemeSwitcher: En komponent som använder useContext för att byta mellan olika färgteman för appen.
GlobalStyles använd styled-components
