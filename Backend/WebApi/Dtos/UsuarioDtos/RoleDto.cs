namespace WebApi.Dtos.UsuarioDtos
{
    public class RoleDto
    {
        /// <summary>
        /// <param Nombre="Nombre">Nombre que identifica el tipo de rol</param>
        /// <param Status="true">Boleano que determinar el estado del rol</param>
        /// </summary>
        public string Nombre { get; set; }
        public bool Status { get; set; }
    }
}
