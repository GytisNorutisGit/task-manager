namespace backend.Models;

public class Task
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public string Notes { get; set; } = string.Empty;

    public int Priority { get; set; } = 2;

}