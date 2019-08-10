import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataUtilsService } from './services/data-utils.service';
import { RectangleComponentComponent } from './rectangle-component/rectangle-component.component';

@NgModule({
  declarations: [
      AppComponent,
      RectangleComponentComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule
  ],
  providers: [DataUtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
