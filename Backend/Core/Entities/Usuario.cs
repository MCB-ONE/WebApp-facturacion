using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class Usuario: IdentityUser
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string? Imagen { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? DeletedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
