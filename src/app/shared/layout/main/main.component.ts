import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from "../../components/loading/loading.component";
import { LoadingService } from '../../components/loading/loading.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, LoadingComponent, CommonModule, SidebarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  private _loadingService = inject(LoadingService);

  _isLoading$ = this._loadingService._isLoading$;
}
