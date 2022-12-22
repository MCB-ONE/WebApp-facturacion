import { Injectable } from "@angular/core";
import { Empresa } from "@app/models/backend";
import { EmpresaForm } from "@app/store/empresa/form/form.models";

@Injectable()
export class MapperService {
  constructor(){}

  empresaToForm(empresa: Empresa): EmpresaForm{
    const empresaForm: EmpresaForm = {
      nombre: empresa.nombre,
      nif: empresa.nif,
      logo: empresa.logo,
      calle: empresa.calle,
      numero: empresa.numero,
      codigoPostal: empresa.codigoPostal,
      ciudad: empresa.ciudad,
      provincia: empresa.provincia,
      pais: empresa.pais,
      telefono: empresa.telefono,
      email: empresa.email
    }

    return empresaForm;
  }

}
