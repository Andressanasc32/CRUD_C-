using System.ComponentModel.DataAnnotations;

namespace TesteWeb.Models
{
    public class Personagens
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        [MinLength(2, ErrorMessage = "O campo Nome deve ter no mínimo 2 caracteres.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O campo Poder é obrigatório.")]
        public string tipo { get; set; }
       
    }
}
