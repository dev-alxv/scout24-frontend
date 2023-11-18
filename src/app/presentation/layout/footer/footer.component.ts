import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scout24-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public impressumLink = 'https://www.immoviewer.de/impressum';

  public dataProtectionLink = 'https://www.immoviewer.de/datenschutz';
  constructor() { }

  ngOnInit(): void {
  }

}
