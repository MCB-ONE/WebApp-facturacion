using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BussinesLogic.Data.Configuration
{
    public class FacturaConfiguration : IEntityTypeConfiguration<Factura>
    {
        public void Configure(EntityTypeBuilder<Factura> builder)
        {
            builder.Property(f => f.Numero)
                .IsRequired();

            builder.Property(f => f.FechaExpedicion)
                .IsRequired();

            builder.Property(f => f.Subtotal)
                .HasColumnType("decimal(18,4)")
                .IsRequired();

            builder.Property(f => f.Iva).IsRequired();

            builder.Property(f => f.Total)
                .HasColumnType("decimal(18,4)")
                .IsRequired();

            builder.OwnsOne(f => f.Cliente, cliente =>
            {
                cliente.Property( c => c.Nombre)
                    .IsRequired()
                    .HasMaxLength(256);

                cliente.Property(c => c.NIF)
                    .IsRequired()
                    .HasMaxLength(9)
                    .IsFixedLength();

                cliente.Property(c => c.Calle)
                    .IsRequired()
                    .HasMaxLength(256);

                cliente.Property(c => c.Numero)
                    .IsRequired()
                    .HasMaxLength(3);

                cliente.Property(c => c.CodigoPostal)
                    .HasMaxLength(5);

                cliente.Property(c => c.Ciudad)
                    .HasMaxLength(50)
                    .IsRequired();

                cliente.Property(c => c.Provincia)
                    .HasMaxLength(50)
                    .IsRequired();

                cliente.Property(c => c.Pais)
                    .HasMaxLength(50)
                    .IsRequired();

                cliente.Property(c => c.Telefono)
                    .HasMaxLength(9)
                    .IsRequired();

                cliente.Property(p => p.Email)
                    .HasMaxLength(256);
            });

            builder.OwnsMany(f => f.LineasFactura, linea =>
            {
                linea.Property(l => l.Concepto)
                    .HasMaxLength(150)
                    .IsRequired();

                linea.Property(l => l.PrecioUnitario)
                    .HasColumnType("decimal(18,4)")
                    .IsRequired();


                linea.Property(l => l.Cantidad)
                    .HasDefaultValue(1)
                    .IsRequired();

                linea.Property(l => l.Total)
                    .HasColumnType("decimal(18,4)")
                    .IsRequired();

                linea.WithOwner();
            });

        }
    }
}
