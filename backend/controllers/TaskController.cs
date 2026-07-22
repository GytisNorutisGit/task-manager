namespace backend.Controllers;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    [HttpGet]
    public IActionResult GetTasks()
    {
        var tasks = new List<Task>
        {
            new Task { Id = 1, Title = "Task 1", Status = "todo" },
            new Task { Id = 2, Title = "Task 2", Status = "in-progress" },
            new Task { Id = 3, Title = "Task 3", Status = "completed" },
            new Task { Id = 4, Title = "Task 4", Status = "blocked" }
        };
        return Ok(tasks);
    }
}