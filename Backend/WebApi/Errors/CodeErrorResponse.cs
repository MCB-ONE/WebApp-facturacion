namespace WebApi.Errors
{
    public class CodeErrorResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }

        public CodeErrorResponse(int statusCode, string? message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageStatusCode(statusCode);
        }

        static private string GetDefaultMessageStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "La request envíada contiene algún error.",
                401 => "No tiene autorización para aaceder a este recurso.",
                404 => "El recurso al que intenta acceder no se encuentra disponible",
                500 => "Se ha producido algún error en el servidor",
                _ => null
            };

        }


    }
}
