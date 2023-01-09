import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuarioResponse } from '@app/store/usuario';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {

  @Input() isAuthorized!: boolean | null;
  @Input() usuario!: UsuarioResponse | null;
  @Output() signOut = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }


  onSignOut(): void {
    this.signOut.emit();
  }


}
