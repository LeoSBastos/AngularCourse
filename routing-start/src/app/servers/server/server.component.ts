import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: { id: number; name: string; status: string };
  paramsSubscription: Subscription;
  constructor(
    // private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.server = data.server;
    });
    // this.paramsSubscription = this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params.id);
    // });
  }
  ngOnDestroy() {
    // this.paramsSubscription.unsubscribe();
  }
  onEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve'
    });
  }
}
