
import { isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

declare const google: any;

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css'
})


export class MapPageComponent implements AfterViewInit {
  private map!: google.maps.Map;

  userLocation!: google.maps.LatLngLiteral;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformID: Object, private router: Router) {
    this.isBrowser = isPlatformBrowser(this.platformID);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser)
      this.loadGoogleMaps();
  }

  private async loadGoogleMaps(): Promise<void> {
    const loader = new Loader({
      apiKey: "AIzaSyAt_BO_9KJfWBYU0dROZccDuZzzvNldmBg",
      version: 'weekly'
    });

    try {
      const { Map } = await loader.importLibrary("maps") as google.maps.MapsLibrary;
      
      this.initializeMap(Map);
    } catch (err) {
      console.error("Error loading Google Maps API", err);
    }
  }

  private initializeMap(Map: typeof google.maps.Map): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 41.8708, lng: -87.6505 },
      zoom: 15,
    }

    const mapElement = document.getElementById('map') as HTMLElement;
    this.map = new google.maps.Map(mapElement, mapOptions);

    this.addUserLocationMarker();
  }
  
  navigationItems: NavItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Find Your Clinic', route: '/map' },
    { label: 'Avatar', route: '/avatar' },
    { label: 'More Games', route: '/more-games' },
    { label: 'Ask VacciWiz', route: '/info' },  
  ];

  onNavHover(element: HTMLElement) {
    gsap.to(element, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  onNavLeave(element: HTMLElement) {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  onNavClick(route: string): void {
    this.router.navigate([route]);
  }

  async searchClinics() {
    const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;

    const request = {
      fields: ['displayName', 'formattedAddress', 'location', 'nationalPhoneNumber', 'businessStatus', 'types'],
      locationRestriction: {
        center: this.userLocation,
        radius: 500,
      },
      includedPrimaryTypes: ['doctor', 'hospital', 'pharmacy','drugstore'],
      maxResultCount: 10,
      rankPreference: SearchNearbyRankPreference.POPULARITY,
      language: 'en-US',
      region: 'us',
    };

    const { places } = await Place.searchNearby(request);

    if (places.length) {
      this.addMarkers(places);
    }
  }

  private addUserLocationMarker(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          new google.maps.Marker({
            position: userLocation,
            map: this.map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: 'white'
            }
          });

          this.map.setCenter(userLocation);
          this.userLocation = userLocation;

          //this.nearbySearch(Place);
          this.searchClinics();
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported by this browser");
    }
  }

  private addMarkers(places: google.maps.places.Place[]) {
    const infoWindow = new google.maps.InfoWindow();

    places.forEach((place) => {
      let title = place.displayName;
      let addr = place.formattedAddress;
      let phone = place.nationalPhoneNumber;

      const marker = new google.maps.Marker({
        position: place.location,
        map: this.map,
        title,
      });

      marker.addListener("click", () => {
        infoWindow.close();

        const headerElement = document.createElement("h3");
        headerElement.style.paddingTop = "0";
        headerElement.textContent = marker.getTitle();

        infoWindow.setHeaderContent(headerElement);
        
        infoWindow.setContent(`
          <div class="info-window">
            <p>${addr}</p>
            <p>${phone}</p>
          </div>
        `);
        infoWindow.open(marker.getMap(), marker);
      })
    })
  }

  navigateToLeaderboard() {
    this.router.navigate(['/leaderboard']);
  }
}
