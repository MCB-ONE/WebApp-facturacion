import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Empresa } from '@app/models/backend/empresa';

@Component({
  selector: 'app-active-empresa-header',
  templateUrl: './active-empresa-header.component.html',
  styleUrls: ['./active-empresa-header.component.scss']
})
export class ActiveEmpresaHeaderComponent implements OnInit {

  @Input() title!: string;
  @Input() empresa !: Empresa;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ) {
      this.matIconRegistry.addSvgIcon(
        `add-company`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/add-company-icon.svg')
      );
     }

  ngOnInit(): void {

    }


}

