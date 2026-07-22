namespace backend.Controllers;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    [HttpGet]
    public IActionResult GetTasks()
    {
        var tasks = new List<string> { "Task 1", "Task 2", "Task 3" };
        return Ok(tasks);
    }
}