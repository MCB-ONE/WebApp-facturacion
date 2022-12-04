using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BussinesLogic.Data.Configuration
{
    public class LineaFacturaConfiguration : IEntityTypeConfiguration<LineaFactura>
    {
        public void Configure(EntityTypeBuilder<LineaFactura> builder)
        {
            builder.Property(l => l.Concepto)
                .HasMaxLength(150)
                .IsRequired();

            builder.Property(l => l.PrecioUnitario)
                .HasColumnType("decimal(18,4)")
                .IsRequired();


            builder.Property(l => l.Cantidad)
                .HasDefaultValue(1)
                .IsRequired();

            builder.Property(l => l.Total)
                .HasColumnType("decimal(18,4)")
                .IsRequired();

        }
    }
}
