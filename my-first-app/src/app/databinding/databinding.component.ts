import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-databinding',
    templateUrl: './databinding.component.html',
    styleUrls: ['./databinding.component.css']
})
export class DatabindingComponent implements OnInit {
    username = '';
    constructor() { }
    isPossible() {
        if (this.username === '') {
            return false;
        }
        return true;
    }
    ngOnInit() { }
}
