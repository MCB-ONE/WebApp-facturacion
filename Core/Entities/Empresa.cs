﻿namespace Core.Entities
{
    public class Empresa : BaseEntity
    {
        public string EmailUsuario { get; set; }
        public string Nombre { get; set; }
        public string NIF { get; set; }
        public string? Logo { get; set; }
        public string Calle { get; set; }
        public int Numero { get; set; }
        public string CodigoPostal { get; set; }
        public string Ciudad { get; set; }
        public string Provincia { get; set; }
        public string Pais { get; set; }
        public int Telefono { get; set; }
        public string? Email { get; set; }
        public bool isActive { get; set; } = false;

        // Navigation properties
        public HashSet<Factura> Facturas { get; set; }

    }
}
