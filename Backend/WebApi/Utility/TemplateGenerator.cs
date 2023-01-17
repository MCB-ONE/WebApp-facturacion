using Core.Entities;
using System.Text;

namespace WebApi.Utility
{
    public class TemplateGenerator
    {

        private Factura factura;
        private decimal totalIVA;

        public TemplateGenerator(Factura factura)
        {
            var iva = Convert.ToDecimal(factura.Iva) / 100;

            this.factura = factura;
            this.totalIVA = factura.Subtotal * iva;
        }


        public string GetHTMLString()
        {
            var sb = new StringBuilder();
            sb.AppendFormat(@"
                        <html>
                            <head>
                            </head>
                            <body>");
            sb.AppendFormat(@"
                    <header class='clearfix'>
                        <div id='invoice'> 
                            <h2>FACTURA #{0}</h2>
                            <div><span>FECHA EXPEDICIÓN</span> {1}</div>
                            <div><span>TOTAL</span> {2}€</div>
                        </div>
                    </header>", factura.Numero, factura.FechaExpedicion.ToString("d"), factura.Total.ToString("0,0.000"));

            sb.AppendFormat(@"
                    <div id='address' class='clearfix'>
                        <div id='company' class='clearfix'>
                            <div> {0} </div >
                            <div> {1} {2}</div >
                            <div> {3} ({4}) - {5}</div >
                            <div> {6} </div>
                            <div><a href = '{7}' > {7} </a></div>
                        </div> ", factura.Empresa.Nombre, factura.Empresa.Calle, factura.Empresa.Numero, factura.Empresa.Ciudad, factura.Empresa.CodigoPostal, factura.Empresa.Pais, factura.Empresa.Telefono, factura.Empresa.Email);
            sb.AppendFormat(@"
                        <div id='project'>    
                            <div> {0} </div >
                            <div> {1} {2}</div >
                            <div> {3} ({4}) - {5}</div >
                            <div> {6} </div>
                            <div><a href = '{7}' > {7} </a></div>
                        </div> 
                    </div>
                    <main>
                      <table>
                        <thead>
                          <tr>
                            <th style='padding: 5px;' class='align-left'>Concepto</th>
                            <th style='padding: 5px;'>Cantidad</th>
                            <th style='padding: 5px;'>Precio unid.</th>
                            <th style='padding: 5px;'>Total línea</th>
                          </tr>
                        </thead>
                        <tbody>", factura.Cliente.Nombre, factura.Cliente.Calle, factura.Cliente.Numero, factura.Empresa.Ciudad, factura.Empresa.CodigoPostal, factura.Empresa.Pais, factura.Cliente.Telefono, factura.Cliente.Email);

            foreach (var linea in factura.LineasFactura)
            {
                sb.AppendFormat(@"<tr>
                                    <td style='padding: 10px;' class='align-left'>{0}</td>
                                    <td style='padding: 10px;'>{1}</td>
                                    <td style='padding: 10px;'>{2}€</td>
                                    <td style='padding: 10px;'>{3}€</td>
                                  </tr>", linea.Concepto, linea.Cantidad, linea.PrecioUnitario.ToString("0,0.000"), linea.Total.ToString("0,0.000"));
            }

            sb.AppendFormat(@"<tr>
            <td style='padding: 10px 25px 10px 0px;' colspan='3' class='align-right resume'>SUBTOTAL</td>
            <td class='total'>{0}€</td>
          </tr>
          <tr>
            <td style='padding: 10px 25px 10px 0px;' colspan='3' class='align-right resume'> IVA {1}%</td>
            <td class='total'>{2}€</td>
          </tr>
          <tr>
            <td style='padding: 15px 25px 10px 0px;' colspan='3' class='align-right resume grand total'> TOTAL FACTURA</td>
            <td class='grand total'>{3}€</td>
          </tr>", factura.Subtotal.ToString("0,0.000"), factura.Iva, totalIVA.ToString("0,0.000"), factura.Total.ToString("0,0.000"));

            sb.Append(@"

                        </tbody>
                        </table>
                    <footer>
                      Factura generada automáticamente por FacturApp. Aplicación desarollada por <a href = 'https://tonione.es/' >Toni Salvadó </a>.
                    </footer>
                    </body>
                </html>");
            return sb.ToString();
        }
}
}
