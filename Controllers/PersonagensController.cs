using Microsoft.AspNetCore.Mvc;
using TesteWeb.Models;
using TesteWeb.Database;
using Microsoft.EntityFrameworkCore;

namespace TesteWeb.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class PersonagensController : ControllerBase
    {
        private readonly Database.AppDbContext _context;
        public PersonagensController(Database.AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePersonagem([FromBody] Personagens personagem)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.DBZ.Add(personagem);
            await _context.SaveChangesAsync();
            return Created("Personagem adicionado com sucesso!",personagem);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Personagens>>> GetPersonagens()
        {
           /* if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }*/
            var personagens = await _context.DBZ.ToListAsync();
            return Ok(personagens);
        }

       
        [HttpGet("{id}")]
        public async Task<ActionResult> GetPersonagemId(int id)
        {
            var personagem = await _context.DBZ.FindAsync(id);

            if (personagem == null)
            {
                return NotFound("Personagem não encontrado");
            }

            return Ok(personagem);
        }

        [HttpPut ("{id}")]
        public async Task<IActionResult> UpdatePersonagem(int id, [FromBody] Personagens
            personagemAtualizado)
        {
            var buscar_personagem = await _context.DBZ.FindAsync(id);

            if (buscar_personagem == null)
            {
                return StatusCode(404, "Personagem não encontrado");
            }
            //Atualizar dados do personagem
            _context.Entry(buscar_personagem).CurrentValues.SetValues(personagemAtualizado);
            await _context.SaveChangesAsync();
            return StatusCode(201, "Personagem Atualizado Com Sucesso!"); 
        }

        [HttpDelete ("{id}")]
        public async Task<IActionResult> DeletePersonagem(int id)
        {
            var personagem = await _context.DBZ.FindAsync(id);
            if (personagem == null)
            {
                return StatusCode(404, "Personagem não encontrado");
            }

            _context.DBZ.Remove(personagem);
            await _context.SaveChangesAsync();
            return StatusCode(200, "Personagem deletado com sucesso!");
        }
     
    }
}