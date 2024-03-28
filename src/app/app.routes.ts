import { Routes } from '@angular/router';
import { ArtGalleryComponent } from './art-gallery/art-gallery.component';
import { AboutComponent } from './about/about.component';
import { PrivacyandSecurityComponent } from './privacyand-security/privacyand-security.component';
import { HelpComponentComponent } from './help-component/help-component.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
    { path: '', component: ArtGalleryComponent },
    {path: 'about', component:AboutComponent},
    {path: 'privacyand-security', component:PrivacyandSecurityComponent},
    {path: 'help-component', component:HelpComponentComponent},
    {path: '**' , component:ErrorPageComponent}
];
