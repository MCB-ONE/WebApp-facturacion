import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class FacturaService {

  constructor(private http: HttpClient){}

  GnerateFactura(facturaId: number){
    return this.http.get('https://localhost:7124/api/Factura/generarPDF/'+facturaId, {observe:'response', responseType:'blob'});
  }
}
