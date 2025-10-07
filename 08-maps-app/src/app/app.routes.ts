import { Routes } from '@angular/router';
import { FullscreenMapPageComponent } from './pages/fullscreen-map-page/fullscreen-map-page.component';
import { MarkersPageComponent } from './shared/components/markers-page/markers-page.component';
import { HousesPageComponent } from './shared/components/houses-page/houses-page.component';

export const routes: Routes = [

    {
        path: 'fullscreen',
        component: FullscreenMapPageComponent,
        title: 'FullScreen Map'
    },
    {
        path: 'markers',
        component: MarkersPageComponent,
        title: 'Marcadores'
    },
    {
        path: 'houses',
        component: HousesPageComponent,
        title: 'Casas - Propiedades disponibles'
    },
    {
        path: '**',        
        redirectTo: 'fullscreen'
    },


];
