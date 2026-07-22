namespace backend.Controllers;

using backend.Models;
using Microsoft.AspNetCore.Mvc;
using backend.Data;



[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public IActionResult GetTasks()
    {
        return Ok(_context.Tasks.ToList());
    }

    [HttpPost]
    public IActionResult CreateTask([FromBody] Task task)
    {
        _context.Tasks.Add(task);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetTasks), task);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTask(int id)
    {
        var task = _context.Tasks.Find(id);
        if (task == null) return NotFound();

        _context.Tasks.Remove(task);
        _context.SaveChanges();
        return NoContent();
    }
}