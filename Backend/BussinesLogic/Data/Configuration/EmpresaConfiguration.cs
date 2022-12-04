using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinesLogic.Data.Configuration
{
    public class EmpresaConfiguration : IEntityTypeConfiguration<Empresa>
    {
        public void Configure(EntityTypeBuilder<Empresa> builder)
        {
            builder.Property(p => p.EmailUsuario)
                .HasMaxLength(250)
                .IsRequired();

            builder.Property(p => p.Nombre)
                .IsRequired()
                .HasMaxLength(256);

            builder.Property(p => p.NIF)
                .IsRequired()
                .HasMaxLength(9)
                .IsFixedLength();

            builder.Property(p => p.Calle)
                .IsRequired()
                .HasMaxLength(256);

            builder.Property(p => p.Numero)
                .IsRequired()
                .HasMaxLength(3);

            builder.Property(p => p.CodigoPostal)
                .HasMaxLength(5);

            builder.Property(p => p.Ciudad)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(p => p.Provincia)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(p => p.Pais)
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(p => p.Telefono)
                .HasMaxLength(9)
                .IsRequired();

            builder.Property(p => p.Email)
                .HasMaxLength(256);

            builder.Property(p => p.isActive)
                .IsRequired()
                .HasDefaultValue(false);

            builder.HasMany(c => c.Facturas)
                .WithOne(a => a.Empresa)
                .HasForeignKey(a => a.EmpresaId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
